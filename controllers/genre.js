const { response } = require('express')
const Genre = require('../models/Genre')

//crear pelicula
const createGenre = async(req, res = response) => {
    const { image, name } = req.body
    try{
        const [genre, created] = await Genre.findOrCreate({
            where: { name: name },
            defaults: {
                image,
                name
            }
        })
        if(!created) return res.status(400).json({
            ok: false,
            msg: 'This Genre is already exist'
        })
        return res.status(200).json({
            ok: true,
            msg: 'The genre has been created',
            genre
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal error'
        })
    }
}

module.exports = createGenre