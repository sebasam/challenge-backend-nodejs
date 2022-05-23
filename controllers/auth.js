
const { response } = require('express')
const User  = require('../models/User')
const bcrypt = require('bcryptjs')
const generateJWT = require('../helpers/jwt')
const sgMail = require('@sendgrid/mail')

//register user
const createUser = async(req, res = response) => {
    const { username, email, password } = req.body
    try{
        let [ user, created ] = await User.findOrCreate({
            where: { email: email },
            defaults: {
                username,
                email,
                password
            }
        })
        if(!created) return res.status(400).json({
            ok: false,
            msg: 'This email is already exist'
        })


        //hash password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )

        //generate JWT
        const token = await generateJWT(user.id, username)

        sgMail.setApiKey(process.env.API_KEY)
        const message = {
            to: user.email,
            from: process.env.MY_EMAIL,
            subject: 'Your register has been success',
            text: 'Welcome to Disney API'
        }

        await sgMail.send(message)

        await user.update({
            password: user.password
        },{
            where: {
                id: user.id
            }
        })
        return res.status(200).json({
            ok: true,
            msg: 'The user has been created succesfuly',
            user,
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, please contact to support'
        })
    }
}

//login user
const loginUser = async(req, res = response) => {
    const { email, password } = req.body

    try{

        const user = await User.findOne({where: {email: email}})
        if(!user) return res.status(401).json({
            ok: false,
            msg: 'The email doesnt exist!'
        })

        //password match
        const validatePassword = bcrypt.compareSync(password, user.password)
        if(!validatePassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password is not valid'
            })
        }

        //generate JWT
        const token = await generateJWT(user.id, user.username)        

        return res.status(200).json({
            ok: true,
            id: user.id,
            email: user.email,
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact to support'
        })
    }
}

module.exports = {
    createUser,
    loginUser
}