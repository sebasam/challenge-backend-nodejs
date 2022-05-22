const { Router } = require('express')
const { getCharacters, createCharacter, getCharacter, updateCharacter, deleteCharacter } = require('../controllers/character')

const router = Router()

// obtener personajes
router.get('/', getCharacters)

//crear personaje
router.post('/new', createCharacter)

//obtener personaje por id
router.get('/:id', getCharacter)

//actualizar personaje
router.patch('/:id', updateCharacter)

//borrar personaje
router.delete('/:id', deleteCharacter)

module.exports = router