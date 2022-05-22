const character = require('../models/Character')
const movie = require('../models/Movie')
const genre = require('../models/Genre')

movie.hasMany(character, { as: 'characters', foreignKey: 'movieId' })

character.belongsTo(movie, { as:'movies', foreignKey: 'movieId' })

movie.hasMany(genre, { as:'genres', foreignKey: 'movieId' })

genre.belongsTo(movie,{ foreignKey:'movieId' })
