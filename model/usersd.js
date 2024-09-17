'use strict'

const { STRING, BIGINT } = require("sequelize")

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: STRING,
        email: STRING,
        password: STRING,
        roleId: BIGINT
    }, {});
    User.associate = function(models) {
        User.hasOne(sequelize.define('Address'))
    }
    return User
}
