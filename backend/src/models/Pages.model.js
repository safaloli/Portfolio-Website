const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/sequelize.config')

const PageModel = sequelize.define('pages', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    portfolio_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    slog: {
        type: DataTypes.STRING
    },
    order: {
        type: DataTypes.INTEGER
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = PageModel