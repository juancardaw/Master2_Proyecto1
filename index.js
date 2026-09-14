// Configuracion del index, que seria nuestro servidor principal
// Primero, configuro las variables de entorno
require("dotenv").config();

// Importaciones
const express = require("express");
const songsRoutes = require("./src/api/routes/songs.routes");
const usersRoutes = require("./src/api/routes/users.routes");
const { connectDB } = require("./src/config/db");
const { connectCloudinary } = require("./src/config/cloudinary");

// Inicializo el servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Conexiones a servicios
connectDB();
connectCloudinary();

// Middleware globales
app.use(express.json()); //Esto lo pongo para que el servidor entienda archivos JSON


// RUTAS
// Esta es solo para comprobar que funciona
app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Servidor de musica funcionando perfectamente!"});
});
// Ruta de las canciones
app.use("/api/songs", songsRoutes);

// Ruta de los usuarios
app.use("/api/users", usersRoutes);

// Ruta para capturar cualquier tipo de error
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});


// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor arrancado con exito en http://localhost:${PORT}`);
});

