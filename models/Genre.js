const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db/db')

class Genre extends Model {}
Genre.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: DataTypes.STRING,
    name: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Genre',
    timestamps: false
})

module.exports = Genre