const { Router } = require('express')
const { createMovie, getMovies, getMovie, updateMovie, deleteMovie } = require('../controllers/movie')
const { check } = require('express-validator')
const validateFields = require('../middlewares/validate-fields')
const router = Router()

//crear película
router.post('/new', createMovie)


//obtener peliculas
router.get('/', getMovies)

//obtener pelicula y personajes por id
router.get('/:id', getMovie)

//actualizar pelicula
router.patch('/:id', updateMovie)

//borrar pelicula
router.delete('/:id', deleteMovie)


module.exports = router