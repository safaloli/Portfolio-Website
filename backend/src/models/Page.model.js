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
    title: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['portfolio_id', 'slug']
        }
    ]
})

module.exports = PageModel