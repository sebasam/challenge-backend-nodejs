const { Router } = require('express')
const createGenre = require('../controllers/genre')
const router = Router()

//crear película
router.post('/', createGenre)

module.exports = router