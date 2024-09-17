const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')
const User = require('../model/user')


const Comment = sequelize.define('comment', {
    body: {
        type: DataTypes.STRING,
        validate: {
            max: 250
        }
    }
})


module.exports = Comment

