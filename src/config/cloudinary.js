// Configuracion de cloudinary, con el nombre y contraseñas definidas en .env
const cloudinary = require("cloudinary").v2;

const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log(" Conectado con exito a Cloudinary");
    } catch (error) {
        console.log("No se pudo conectar a Cloudinary", error );
    }
};


module.exports = { connectCloudinary, cloudinary };
