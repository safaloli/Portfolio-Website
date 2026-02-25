const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/sequelize.config')

const PortfolioModel = sequelize.define('portfolios', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    theme: {
        type: DataTypes.STRING,
        defaultValue: 'default'
    },
    is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    timestamps: true,
    paranoid: true,
})

module.exports = PortfolioModel