const {sequelize} = require('../db')
const {DataTypes} = require('sequelize')
const Address  = require('../model/address')
const Post  = require('../model/post')
//const checkIfEmailAlreadyExist = `SELECT COUNT(*) AS count FROM users WHERE email = ?`

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        validate: {
            max: 200
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

//sequelize.sync()

module.exports = {
    User
}
