const character = require('../models/Character')
const movie = require('../models/Movie')
const genre = require('../models/Genre')

character.hasMany(movie, { as: 'movies', foreignKey: 'characterId' })

movie.belongsTo(character, {as: 'characters', foreignKey: 'characterId' })

genre.hasMany(movie, { as: 'movies', foreignKey: 'genreId' })

movie.belongsTo(genre, { as: 'genre' })






