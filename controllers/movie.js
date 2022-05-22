const { response } = require('express')
const Movie = require('../models/Movie')
const Character = require('../models/Character')
const Genre = require('../models/Genre')

//crear pelicula
const createMovie = async(req, res = response) => {
    const { image, title, date, score, characterId, genreId } = req.body
    try{
        const [movie, created] = await Movie.findOrCreate({
            where: { title: title },
            defaults: {
                image,
                title,
                date,
                score
            }
        })
        if(!created) return res.status(400).json({
            ok: false,
            msg: 'This Movie is already exist'
        })
        return res.status(200).json({
            movie
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal error'
        })
    }
}

//obtener peliculas
const getMovies = async(req, res = response) => {
    try{
        const movies = await Movie.findAll({
            attributes: ['title', "date", "image"]                                  
        })
        return res.json({
            movies
        })
    }catch(error){
        console.log(error)
        return res.json({
            ok: false,
            msg: 'The movie doesnt exist'
        })
    }
}

//obtener pelicula por id
const getMovie = async(req, res = response) => {
    try{
        const movie = await Movie.findAll({
            where: { id: req.params.id },
            attributes: ['title', 'image', 'date', 'score'],
            include: {
                model: Character,
                as: 'characters',
                attributes: ['name', 'history']
            }
        })
        res.json({
            movie
        })
    }catch(error){
        console.log(error)
    }
}

//actualizar pelicula
const updateMovie = async(req, res = response) => {
    const { title, score } = req.body
    try{
        await Movie.update({
            title: title,
            score: score
        }, {
            where: {
               id: req.params.id
            }
        })
        return res.json({
            ok: true,
            msg: 'The movie has been updated'
        })
    }catch(error){
        console.log(error)  
    }
}

//borrar pelicula
const deleteMovie = async(req, res = response) => {
    try{
        await Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.json({
            ok: true,
            msg: 'The movie has been deleted'
        })
    }catch(error){
        console.log(error)  
    }
}



module.exports = {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie
}