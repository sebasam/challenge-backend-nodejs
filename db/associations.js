const character = require('../models/Character')
const movie = require('../models/Movie')
const genre = require('../models/Genre')

movie.hasMany(character)

character.belongsTo(movie)

movie.hasMany(genre)

genre.belongsTo(movie)

// Character.belongsToMany(Movie, { through: 'characterId' })
// Movie.belongsToMany(Character, { through: 'characterId' })

// Genre.belongsToMany(Movie, { through: 'genreId' })
// Movie.belongsToMany(Genre, { through: 'genreId' })






