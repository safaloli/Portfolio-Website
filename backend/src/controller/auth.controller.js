const {userService, sessionService} = require('../services')
const {AppConfig} = require('../config/app.config')
const {Status} = require('../config/constants')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const RandomStringGenerator = require('../utilities/randomStringGenerator')
const cloudinaryService = require('../services/cloudinary.service')

class AuthController {
    createUser = async (req, res, next) => {
        try{
            
            // data mapping
            const userData = await userService.transformForUserRegister(req)

            const existingUser = await userService.getSingleUserByFilter({email: userData.email})
            if(existingUser?.email){
                throw({code: 404, message: "Email already registered", status: "EMAIL_AREADY_REGISTERED_ERR"})
            }

            const user = await userService.create(userData)

            res.json({
                data: user,
                message: "User has been registered successfully",
                status: "REGISTERED_SUCCESSFULLY"
            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }

    loginUser = async (req, res, next) => {
        try{
            const {email, password} = req.body
            const userDetail = await userService.getSingleUserByFilter({email: email})

            // email verify
            if(!userDetail){
                throw({
                    code: 404,
                    message: "User not registered",
                    message: "USER_NOT_REGISTERED_ERR"
                })
            }
            
            // compare password
            if(!bcrypt.compareSync(password, userDetail.password)){
                throw ({
                    code: 422,
                    message: "Incorrect Password",
                    status: "INCORRECT_PASSWORD_ERR"
                })
            }

            // acitivation token verify
            if(userDetail.status !== Status.ACTIVE){
                throw({
                    code: 422,
                    message: "Your account is not activated yet",
                    status: "ACCOUNT_NOT_ACTIVATED_ERR"
                })
            }

            // access to the platform
            const accessToken = jwt.sign(
                {sub: userDetail.id},
                AppConfig.jwtSecret,
                {expiresIn: "1d"}
            )

            const sessionData = await sessionService.storeSession({
                userId: userDetail.id,
                token: accessToken,
                device: "web"
            })  

            res.json({
                data: {
                    token: accessToken,
                    sessionId: sessionData.id
                },
                message: "Login Successfully",
                status: "LOGIN_SUCCESS"
            })
        }catch(exception){
            console.error(exception)
            next(exception)
        }
    }

    getLoggedInUserProfile = (req, res, next) => {
        res.json({
            data: req.loggedInUser,
            message: "Your Profile",
            status: 'ok'
        })
    }

    activateUser = async (req, res, next) => {
        try{
            const token = req.params.token
            const userDetail = await userService.getSingleUserByFilter({activationToken: token})

            if(!userDetail){
                res.redirect(`${AppConfig.frontendAppUrl}/?status=error&msg=Token doesnot associate with any user`)
                // throw({code: 404, message: "Token doesnot associate with any user", status: "INVALID_TOKEN_ERR"})
            }else{
                // user found
                const today = Date.now()
                if(today > userDetail.tokenExpiryTime){
                    res.redirect(`${AppConfig.frontendAppUrl}/?status=error&msg=Activation link is expired`)
                    // throw({code: 400, message: "Activation link is expired", status: "LINK_EXPIRED_ERR"})
                }else{
                    const activationBody = {
                        status: Status.ACTIVE,
                        activationToken: null,
                        tokenExpiryTime: null
                    }
                    await userService.updateSingleUserByFilter(
                        activationBody,
                        {id: userDetail.id}
                    )

                    res.redirect(`${AppConfig.frontendAppUrl}/?status=success&msg=User has been activated successfully`)
                    
                    // res.json({user_id: userDetail.id, message: "User has been activated successfully", status: "ACTIVATION_SUCCESS"})
                }
                
            }
            
        }catch(exception){
            res.redirect(`${AppConfig.frontendAppUrl}/?status=error&msg=Activation Failed`)
            next(exception)
        }
    }
    
    resendActivationLink = async(req, res, next) => {
        try{
            const token = req.params.token
            
            const userDetail = await userService.getSingleUserByFilter({activationToken: token})
            if(!userDetail){
                res.redirect(`${AppConfig.frontendAppUrl}/?status=error&msg=Token doesnot associate with any user`)
                // throw({ code: 404, message: "Token doesnot associate with any user", status: "INVALID_TOKEN_ERR" })
            }
            
            const today = Date.now()
            if(today <= userDetail.tokenExpiryTime){
                res.redirect(`${AppConfig.frontendAppUrl}/?status=error&msg=Token is not expired. Please try clicking the link again`)
                // throw({ code: 422, message: "Token is not expired. Please try clicking the link again.", status: "TOKEN_NOT_EXPIRED_ERR"})
            }
            
            const activationBody = {
                status: Status.INACTIVE,
                activationToken: RandomStringGenerator(),
                tokenExpiryTime: new Date(today + 86400000) // 1 day
            }
            
            // update user in database
            const user =  await userService.updateSingleUserByFilter(activationBody, {id: userDetail.id})
            
            // send mail of activation link
            // await userService.resendActivationEmail(user)

            res.redirect(`${AppConfig.frontendAppUrl}/?status=error&msg=Link has been forwarded to registered email`)

            // res.json({data: activationBody, message: "Link has been forwarded to registered email", status: "ok"})
            
        }catch(exception){
            res.redirect(`${AppConfig.frontendAppUrl}/?status=error&msg=Activation link send failed`)
            // console.log(exception)
            next(exception)
        }
    }

    updateUserProfile = async(req, res, next) => {
        try{
            if(!req.body){
                res.json({
                    code: 422,
                    message: "Empty payload",
                    status: "EMPTY_PAYLOAD_ERR"
                })
            }
            const id = req.loggedInUser.id
            const updateBody = await userService.transformForUserUpdate(req)

            await userService.updateSingleUserByFilter(updateBody, {id: id})

            // delete previous image after update 
            const previousImage = req.loggedInUser.image
            if(req.file && updateBody.image !== undefined && previousImage !== null){
                await cloudinaryService.deleteSingleFile(previousImage.publicId)
            }
            res.json({
                updatedData: updateBody,
                message: "User data has been updated",
                status: "ok"
            })
        }catch(exception){
            next({
                code: exception.code,
                message: exception.message || exception.detail || "Error while updating user row",
                status: "USER_UPDATE_ERR"
            })
        }
    }

    logoutUser = async (req, res, next) => {
        try{
            const userId = req.loggedInUser.id;
            await sessionService.deleteSingleRowByFilter({userId: userId})

            res.json({
                data: null,
                message: "Logout successfully",
                status: "ok"
            })
        }catch(exception){
            console.error(exception)
            next({
                code: exception.code || 500,
                message: exception.message || 'Logout failed',
                status: 'LOGOUT_FAILED_ERR'
            })
        }
    }
}

module.exports = new AuthController()