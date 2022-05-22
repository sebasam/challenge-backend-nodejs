const { Router } = require('express')
const { createMovie, getMovies, getMovie } = require('../controllers/movie')
const router = Router()

//crear película
router.post('/new', createMovie)


//obtener peliculas
router.get('/', getMovies)

//obtener pelicula y personajes por id
router.get('/:id', getMovie)

module.exports = router