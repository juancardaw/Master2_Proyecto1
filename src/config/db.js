// Configurcion de la base de datos

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("URL leida del .env");
        await mongoose.connect(process.env.DB_URL);
        console.log("Conectado a la BBDD con exito")
    } catch (error) {
        console.log("No se ha podido conectar la base de datos", error );
    }
};


module.exports = { connectDB };