// Fichero semilla 

const mongoose = require("mongoose");
const Song = require("../../api/models/song.model");
require("dotenv").config(); // Carga las variables de entorno de .env

const initialSongs = [
    {
        title: "Bohemian Rhapsody",
        artist: "Queen",
        genre: "Rock",
        year: 1975,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        imgId: "sample_id1"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        genre: "Pop",
        year: 2019,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        imgId: "sample_id2"
    },
    {
        title: "Hotel California",
        artist: "Eagles",
        genre: "Rock",
        year: 1976,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        imgId: "sample_id3"
    },
    {
        title: "Billie Jean",
        artist: "Michael Jackson",
        genre: "Pop",
        year: 1982,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        imgId: "sample_id4"
    }
];

const seedSongs = async () => {
    try {
        // Conexión a MongoDB usando la variable de .env
        await mongoose.connect(process.env.DB_URL);
        console.log("🔌 Conectado a MongoDB para ejecutar el Seeder...");

        // Comprobamos si ya existen canciones para limpiar la colección antes de meter las nuevas
        const existingSongs = await Song.find();
        if (existingSongs.length > 0) {
            await Song.collection.drop();
            console.log("Colección de canciones existente borrada con éxito.");
        }

        // Insertamos los datos iniciales
        await Song.insertMany(initialSongs);
        console.log("Semilla plantada! Canciones insertadas correctamente.");

    } catch (error) {
        console.error("Error al ejecutar el seeder:", error);
    } finally {
        // Cerramos la conexión con la base de datos obligatoriamente al terminar
        await mongoose.disconnect();
        console.log("Desconectado de MongoDB. Proceso finalizado.");
    }
};

// Ejecutamos la función
seedSongs();