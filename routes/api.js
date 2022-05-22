const express = require('express')
const router = express.Router()
const auth = require('./auth')
const character = require('./character')
const movie = require('./movie')
const genre = require('./genre')

router.use('/auth', auth)
router.use('/characters', character)
router.use('/movies', movie)
router.use('/genre', genre)

module.exports = router