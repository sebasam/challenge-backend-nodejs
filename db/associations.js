const character = require('../models/Character')
const movie = require('../models/Movie')
const genre = require('../models/Genre')

movie.hasMany(character, { as: 'characters', foreignKey: 'movieId' })

character.belongsTo(movie, { as:'movies', foreignKey: 'movieId' })

genre.hasMany(movie, { as:'genres', foreignKey: 'genreId' })

movie.belongsTo(genre,{ as: 'genres', foreignKey:'genreId' })
