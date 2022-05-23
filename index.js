const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const sequelize = require('./db/db')
require('./db/associations')

//port
port = process.env.PORT

const api = require('./routes/api')

//cors
app.use( cors() )

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)

//port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    
    sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
        sequelize.sync({ force: false }).then(() => {
            console.log('database connected')
        }).catch((error) => {
            console.log(error)
            console.log('Database cannot connected')
        })   
    })    
})

//apikey  sendEmail