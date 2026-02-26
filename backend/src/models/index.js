const UserModel = require('./User.model')
const SessionModel = require('./Session.model')
const {sequelize} = require('../config/sequelize.config')

const PortfolioModel = require('./Portfolio.model')
const PageModel = require('./Page.model')
const SectionModel = require('./Section.model')


// Define association
UserModel.hasMany(SessionModel, {
    foreignKey: 'userId',
    as: "sessions"
});
SessionModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});

PortfolioModel.hasMany(PageModel, {
    foreignKey: "portfolio_id",
    as: "pages"
});
PageModel.belongsTo(PortfolioModel, {
    foreignKey: "portfolio_id",
    as: 'portfolio'
});

PageModel.hasMany(SectionModel, {
    foreignKey: 'page_id',
    as: 'sections'
});
SectionModel.belongsTo(PageModel, {
    foreignKey: 'page_id',
    as: 'page'
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
    PageModel,
    PortfolioModel,
    SectionModel
}