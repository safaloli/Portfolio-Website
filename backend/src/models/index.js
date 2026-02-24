const UserModel = require('./User.model')
const SessionModel = require('./Session.model')
const ContactPageModel = require('./ContactPage.model')
const {sequelize} = require('../config/sequelize.config')


// Define association
UserModel.hasMany(SessionModel, {
    foreignKey: 'userId',
    as: "sessions"
});
SessionModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});

(async()=> {
    try{
        await sequelize.sync({alter: true})
        console.log("all tables are synced")
    }catch(exception){
        throw exception
    }
})();

module.exports = {
    UserModel, 
    SessionModel,
    ContactPageModel
}