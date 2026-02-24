const {sequelize} = require('../config/sequelize.config')
const {DataTypes} = require('sequelize')
const UserModel = require('./User.model')

const SessionModel = sequelize.define("sessions", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: UserModel,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    device: {
        type: DataTypes.ENUM("web", "mobile"),
        defaultValue: "web"
    }
}, {
    timestamps: true,
})

module.exports = SessionModel