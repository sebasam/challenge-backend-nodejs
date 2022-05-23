const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db/db')

class Movie extends Model {}
Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    score: DataTypes.INTEGER,    
}, {
    sequelize,
    modelName: 'Movie',
    timestamps: false
})

module.exports = Movie