const { response, query } = require('express')
const Movie = require('../models/Movie')
const Character = require('../models/Character')
const Genre = require('../models/Genre')

//crear pelicula
const createMovie = async(req, res = response) => {
    const { image, title, date, score, genreId } = req.body
    try{
        const [movie, created] = await Movie.findOrCreate({
            where: { title: title },
            defaults: {
                image,
                title,
                date,
                score,
                genreId
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
    const { title, genre, order } = req.query
    try{      
        let queryFind = {}
        let titleOrder = []
        if(title){
            const movie = await Movie.findAll({
                where: { title: title },
                attributes: ['id', 'image', 'title', 'date']
            })
            return res.json({
                movie
            })
        }
        if(genre){
            const movie = await Movie.findAll({
                where: { genreId: genre },
                attributes: ['id', 'image', 'title', 'date']
            })
            return res.json({
                movie
            })
        }
        if(order){
            if(order === 'ASC'){
                titleOrder.push(['date', 'ASC'])
                const movie = await Movie.findAll({
                    order: titleOrder,
                    attributes: ['id', 'image', 'title', 'date']
                })
                return res.json({
                    movie
                })
            }else{
                titleOrder.push(['date', 'DESC'])
                const movie = await Movie.findAll({
                    order: titleOrder,
                    attributes: ['id', 'image', 'title', 'date']
                })
                return res.json({
                    movie
                })
            }
        }       

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
            include: [
                {
                    model: Character,
                    as: 'characters',
                    attributes: ['name', 'history']
                },
                {
                    model: Genre,
                    as: 'genres',
                    attributes: ['name']
                },
            ]
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
    deleteMovie,
}