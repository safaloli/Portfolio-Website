const bcrypt = require('bcrypt')
const {UserModel} = require('../models')
const {Status, UserRoles} = require('../config/constants.js')
const RandomStringGenerator = require('../utilities/randomStringGenerator')
const cloudinaryService = require('./cloudinary.service') 

class UserService{
    async transformForUserRegister(req) {
        try{
            const data = req.body

            if(req.file){
                data.image = await cloudinaryService.uploadSingleFile(req.file.path, "/users")
            }

            // password hassing
            data.password = bcrypt.hashSync(data.password, 12)

            // by default user is inactive 
            data.status = Status.INACTIVE

            if(req.loggedInUser){
                data.createdBy = req.loggedInUser.id
            }

            // adding activationToken and tokenExpiryTime
            data.activationToken = RandomStringGenerator()
            data.tokenExpiryTime = new Date(Date.now() + 86400000)

            return data
        }catch(exception){
            console.error(exception)
            throw exception
        }
    }

    async create(userData) {
        try{
            const user = await UserModel.create(userData)
            return user
        }catch(exception){
            throw exception
        }
    }

    async getSingleUserByFilter(filter){
        try{
            const data = await UserModel.findOne({where: filter})
            return data
        }catch(exception){
            throw exception
        }
    }

    async updateSingleUserByFilter(updateBody, filter){
        try{    
            const [affectedRows, updatedRows] = await UserModel.update(updateBody, {
                where: filter,
                returning: true
            })

            return updatedRows[0]

        }catch(exception){
            throw exception
        }
    }

    async transformForUserUpdate(req) {
        try{
            const updateBody = {}
            const allowedFields = ['name', 'phone', 'address', 'image']

            if(req.loggedInUser.role === UserRoles.ADMIN || req.loggedInUser.role === UserRoles.SUPERADMIN){
                allowedFields.push("role", 'status')
            }

            allowedFields.forEach((field) => {
                if(req.body[field] !== undefined){
                    updateBody[field] = req.body[field]
                }
            })

            if(allowedFields.includes('image') && req.file){
                updateBody.image = await cloudinaryService.uploadSingleFile(req.file.path, "/users")
            }

            if(req.loggedInUser){
                updateBody.updatedBy = req.loggedInUser.id
            }

            return updateBody
        }catch(exception){
            // console.error(exception)
            throw exception
        }
    }
}

module.exports = new UserService()