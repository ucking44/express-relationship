const {sequelize} = require('./db')
const {DataTypes} = require('sequelize')
//const conn = require('../config/config.json')

const User = sequelize.define('User', {
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

module.exports = User
