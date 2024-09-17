const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')
const User = require('../model/user')

const Address = sequelize.define('address', {
    address: {
        type: DataTypes.STRING,
        validate: {
            max: 350
        }
    },
    // userId: {
    //     type: DataTypes.BIGINT
    // }
})
// Address.associate = function(model) {
//     Address.belongsTo(sequelize.define('User'));
//     //Address.belongsTo(model.User);
// }

// Address.belongsTo(User)

//sequelize.sync()

module.exports = Address

