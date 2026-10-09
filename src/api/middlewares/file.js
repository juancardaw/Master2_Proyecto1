// Middleware de para peticiones que traigan subida de archivos como por ejemplo las imagenes de la cancion o el usuario

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Proyecto1_Musica", //carpeta que se me va a crear el Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"]
    }
});

const upload = multer({ storage });

module.exports = upload;
