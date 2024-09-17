const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')


const Post = sequelize.define('post', {
    title: {
        type: DataTypes.STRING,
        validate: {
            max: 250
        }
    },
    content: {
        type: DataTypes.TEXT,
        validate: {
            max: 300
        }
    },
    image: {
        type: DataTypes.STRING
    },
    // userId: {
    //     type: DataTypes.BIGINT
    // }
})
// Post.hasMany(Comment, { as: "comments" });

// Post.belongsTo(User)

// sequelize.sync()

module.exports = Post


