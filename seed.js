const sequelize = require('./db/db')
const Movie = require('./models/Movie')
const Character = require('./models/Character')
const Genre = require('./models/Genre')
require('./db/associations')


const genres = [
    { name: "Fantasía", image: "https://i0.wp.com/www.julianmarquina.es/wp-content/uploads/Libros-y-fantasia-2.png?resize=960%2C441&ssl=1" },
    { name: "Drama", image: "https://definicion.de/wp-content/uploads/2009/04/drama.png" },
    { name: "Histórico", image: "https://cdnb.20m.es/sites/139/2018/04/Ecce_homo_by_Antonio_Ciseri_1-e1524134252204.jpg" },
    { name: "Aventura", image: "http://blog.falsaria.com/wp-content/uploads/2013/06/Los-relatos-de-aventuras.jpeg" }
]

const movies = [
    { 
        image: 'https://phantom-marca.unidadeditorial.es/598faa8b05f1ffe50a25e79e29921701/resize/1320/f/jpg/assets/multimedia/imagenes/2021/08/18/16292903643922.jpg',
        title: 'La sirenita',
        date: '1837/04/07',
        score: 3,
        genreId: 1
    },
    { 
        image: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/1F1D010AEB22B06D241D97EB7CF3A7ABE290452BAA240838A6EC8E6DD896F01B/scale?width=1200&aspectRatio=1.78&format=jpeg',
        title: 'Tierra de osos',
        date: '2003/10/24',
        score: 4,
        genreId: 2
    },
    { 
        image: 'https://r1.abcimg.es/resizer/resizer.php?imagen=https%3A%2F%2Fstatic1.abc.es%2Fmedia%2Fpeliculas%2F000%2F025%2F460%2Fmulan-2.jpg&nuevoancho=620&medio=abc',
        title: 'Mulan',
        date: '1998/06/05',
        score: 5,
        genreId: 3
    },
    { 
        image: 'https://static.wikia.nocookie.net/disney/images/6/63/Disney-tarzan.jpg/revision/latest?cb=20160923002241&path-prefix=es',
        title: 'Tarzan',
        date: '1999/06/18',
        score: 5,
        genreId: 4
    }
]


const characters = [
    { 
        name: "Ariel",
         image: "https://static1.abc.es/media/play/2019/07/04/sirenita-kuRD--1200x630@abc.jpg",
         age: 25,
         weight: 60,
         history: "La sirena Ariel está fascinada por el mundo de los humanos, pero su padre le prohíbe relacionarse con ellos. En un viaje secreto, se enamora de un humano y recurre a una perversa hechicera para que, mediante un conjuro, su amor triunfe.",
         movieId: 1
     },
     { 
        name: "Flaunder",
         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvu75PFgu04p4TiD51NkRAPXSO510e0ikXKw&usqp=CAU",
         age: 7,
         weight: 6,
         history: "Es un personaje de la película The Little Mermaid de 1989, siendo el mejor amigo de Ariel, acompañándola a todas sus aventuras, aun siendo miedoso.",
         movieId: 1
     },
     { 
        name: "Koda",
         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcx0iNk1YFVHBhNT-qrqwMiLhqONu5h0_IEw&usqp=CAU",
         age: 2,
         weight: 40,
         history: "Koda es un cachorro de oso joven y juguetón, así como un espíritu libre. Está siempre listo para las aventuras, lo que ha llevado a varios acontecimientos a lo largo de su vida. Koda siempre tiene una historia que contar y, por desgracia nunca sabe cuando debe callarse o cuando debe hablar.",
         movieId: 2
     },
     { 
        name: "Kenai",
         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPAuaNegBdpldY2SkRUAS1PEhCWcWjFGteuw&usqp=CAU",
         age: 22,
         weight: 68,
         history: "Kenai es un muchacho que vive junto a sus hermanos y que está esperando que le concedan un don sobre su personalidad que marcará su vida y lo llevará a ser hombre. Sin embargo se decepciona al recibir el don del amor en forma de oso.",
         movieId: 2
     },
     { 
        name: "Mulan",
         image: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/9B856E3197BC3DA45CC41735829EA242D21C28EFEBF48EEF9E29C7F653D3EF70/scale?width=1200&aspectRatio=1.78&format=jpeg",
         age: 16,
         weight: 45,
         history: "Mulan es una película de animación y aventuras dirigida por los estadounidenses Tony Bancroft y Barry Cook, producida por Walt Disney Feature Animation, y estrenada en 1998.",
         movieId: 3
     },
     { 
        name: "Mushu",
         image: "https://static.wikia.nocookie.net/dominios-encantados/images/c/c5/WIKI_MUSHU.png/revision/latest?cb=20141225121703&path-prefix=es",
         age: 1600,
         weight: 10,
         history: "Mushu es el dragón rojo deuteragonista principal de la película de Disney: Mulan, así como su secuela: Mulan 2. Mushu es el fiel compañero de Mulan a lo largo de ambos filmes, ejerciendo de su guardián y protector.",
         movieId: 3
     },
     { 
        name: "Tarzan",
         image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tarzan-live-action-disney-1588672726.jpg?crop=1xw:0.8888888888888888xh;center,top&resize=640:*",
         age: 31,
         weight: 80,
         history: "Tarzán es el alter-ego de John Clayton y un súper héroe creado por Edgar Rice Burroughs. Su primera aparición fue en la revista pulp All Story Magazine en octubre de 1912",
         movieId: 4
     },
     { 
        name: "Jane",
         image: "https://assets.puzzlefactory.pl/puzzle/359/621/original.jpg",
         age: 26,
         weight: 50,
         history: "Tarzán y Jane celebran su primer año juntos, y Jane le busca el regalo perfecto con la ayuda de Terk y Tantor. Recordando todas las aventuras que han compartido, Jane decubre lo excitante que es vivir en la jungla.",
         movieId: 4
     },
]

sequelize.sync({ force: true }).then(() => {
    console.log('Database is connect')
}).then(() => {
    genres.forEach(genre => Genre.create(genre))
}).then(() => {
    movies.forEach(movie => Movie.create(movie))
}).then(() => {
    characters.forEach(character => Character.create(character))
})