const jwt= require("jsonwebtoken")
const sessionService = require("../services/session.service")
const { AppConfig } = require("../config/app.config")
const { UserRoles } = require("../config/constants")

// login check and permission check
module.exports = (role = null) => {
    return async (req, res, next) => {
        try{
            let token = req.headers['authorization']
            if(!token){
                throw({code: 401, message: 'Auth Token is empty', status: "TOKEN_EMPTY_ERR"})
            }

            token = token.replace("Bearer ", "")

            const sessionDetail = await sessionService.getSingleRowByFilter({token: token})

            if(!sessionDetail){
                throw ({
                    code: 404,
                    message: "Token not found",
                    status: "TOKEN_NOT_FOUND_ERR"
                })
            }

            // TOKEN found now verify it
            jwt.verify(token, AppConfig.jwtSecret)

            req.loggedInUser = sessionDetail.user

            // route access
            if(
                role === null || 
                sessionDetail.user.role === UserRoles.ADMIN ||
                (role && role.includes(sessionDetail.user.role))
            ){
                console.log('Checking role is ', role)
                console.log("Actual role is ", sessionDetail.user.role)
                next()
            }else{
                throw({
                    code: 403,
                    message: "Access denied",
                    status: "ACCESS_DENIED_ERR",
                })
            }
        }catch(exception){
            // console.log(exception)
            next({
                code: exception.code || 401,
                message: exception.message || 'Authentication error',
                status: exception.status || 'AUTH_ERR'
            })
        }
    }
}