const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db/db')

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    sequelize,
    modelName: 'User'
})

module.exports = User

