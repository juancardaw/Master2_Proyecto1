// Aqui creo la funcion de borrado de archivos en Cloudinary

const { cloudinary }= require("../config/cloudinary");

const deleteImgCloudinary = async (imgId) => {
    if(!imgId) return;
    try {
        await cloudinary.uploader.destroy(imgId);
        console.log(`Imagen eliminada de Cloudinary con exito: ${imgId}`);
    } catch (error) {
        console.error("Error al borrar la imagen en Cloudinary:", deleteImgCloudinary, error.message);
    }
};

module.exports = { deleteImgCloudinary };