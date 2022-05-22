const { response } = require('express')
const Character  = require('../models/Character')
const Movie = require('../models/Movie')
const Genre = require('../models/Genre')



//Obtener personajes
const getCharacters = async(req, res = response) => {
    try{
        const character = await Character.findAll({
            attributes: ['name', 'image' ]
        })
        res.json({
            character
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal error'
        })
    }
}

//crear personajes
const createCharacter = async(req, res = response) => {
    const { image, name, age, weight, history, movieId } = req.body
    try{
        const [character, created] = await Character.findOrCreate({
            where: { name: name },
            defaults: {
                image,
                name,
                age,
                weight,
                history, 
                movieId
            }
        })
        if(!created) return res.status(400).json({
            ok: false,
            msg: 'This character is already exist'
        })
        return res.status(200).json({
            character
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal error'
        })
    }
}

//obtener personaje por id
const getCharacter = async(req, res = response) => {
    try{
        const info = await Character.findAll({
            where: { id: req.params.id }
            // include: {
            //      model: Movie,
            //      as: 'movies',
            //      attributes: ['title']                 
            // },
        })
        return res.json({
            info
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact to support'
        })
    }
}

//update personaje
const updateCharacter = async(req, res = response) => {
    const{ name, image } = req.body
    try{
        const update = await Character.update({
            name: name,
            image: image
        }, {
            where: {
                id: req.params.id
            }
        })
        return res.json({
            ok: true,
            msg: 'The character has been updated'
        })
    }catch(error){
        console.log(error)
    }
}

//delete personaje
const deleteCharacter = async(req, res = response) => {
    try{
        await Character.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.json({
            ok: true,
            msg: 'The character has been deleted'
        })
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    getCharacters,
    createCharacter,
    getCharacter,
    updateCharacter,
    deleteCharacter
}