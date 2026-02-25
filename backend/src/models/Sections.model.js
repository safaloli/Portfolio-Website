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
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
})

module.exports = SectionModel