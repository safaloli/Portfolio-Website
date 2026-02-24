const { Status } = require('../config/constants')
const {sequelize} = require('../config/sequelize.config')
const {DataTypes} = require('sequelize')
const UserModel = require('./User.model')

const ContactPageModel = sequelize.define("contact page", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    section: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    subTitle: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    socialLinks: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    status: {
        type: DataTypes.ENUM(Status.ACTIVE, Status.INACTIVE),
        defaultValue: Status.ACTIVE,
        allowNull: false,
    }, 
    updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: UserModel,
            key: "users"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: true,
})

module.exports = ContactPageModel