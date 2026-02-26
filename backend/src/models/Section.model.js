const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/sequelize.config')

const SectionModel = sequelize.define("sections", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    page_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        // hero, about_intro, contact_form, stats, gallery, etc
    },
    content: {
        type: DataTypes.JSONB, // dynamic content storage
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    indexes: [
        {
            fields: ['page_id', 'type'],
            unique: true
        }
    ]
})

module.exports = SectionModel