const {sequelize} = require('../config/sequelize.config')
const {DataTypes} = require('sequelize')

const UserModel = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    role: {
        type: DataTypes.ENUM('user', 'admin', 'superadmin'),
        defaultValue: 'user'
    },
    image: {
        type: DataTypes.JSON,
        defaultValue: null,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'inactive'
    },
    activationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tokenExpiryTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
    paranoid: true,
})

module.exports = UserModel