const {SessionModel, UserModel} = require('../models')

class SessionService{
    async storeSession(data) {
        try{
            return await SessionModel.create(data)
        }catch(exception){
            throw exception
        }
    }

    async getSingleRowByFilter(filter) {
        try{
            return await SessionModel.findOne({
                where: filter,
                include: [{
                    model: UserModel,
                    as: "user"
                }]
            })
        }catch(exception){
            throw exception
        }
    }

    async deleteSingleRowByFilter(filter) {
        try{
            await SessionModel.destroy({
                where: filter
            })
        }catch(exception){
            throw exception
        }
    }
}

module.exports = new SessionService()