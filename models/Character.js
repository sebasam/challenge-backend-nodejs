const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db/db')

class Character extends Model {}
Character.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    history: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Character',
    timestamps: false
})

module.exports = Character