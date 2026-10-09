// Modelo del controlador de canciones
const Song = require("../models/song.model");
const { deleteImgCloudinary } = require("../../utils/cloudinary.util");

// GET para obtener todas las canciones
const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        return res.status(200).json(songs);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener las caciones", detalles: error.message });
    }
};


// POST: Crear una cancion
const createSong = async (req, res) => {
    try {
        const newSong = new Song(req.body);

        // Si Multer capturo una imagen, guardamos su URL y su ID publico
        if(req.file) {
            newSong.image = req.file.path;
            newSong.imgId = req.file.filename;
        }
        
        const createdSong = await newSong.save();
        return res.status(201).json(createdSong);

    } catch (error) {
        // Si hay un error al guardar, borramos la imagen que se acaba de subir a cloudinary
        if(req.file){
            await deleteImgCloudinary(req.file.filename);
        }
        return res.status(400).json({ error: "Error al crear la cancion", detalles: error.message });
    }
};


// PUT: Actualizar una cancion
const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const newSongData = new Song(req.body);
        newSongData._id = id; //Mantengo el mismo ID

        // Buscamos la cancion antigua para comprobar si tenia la imagen
        const oldSong = await Song.findById(id);
        if(!oldSong){
            return res.status(404).json({ error: "Cancion no encontrada" });
        }

        // Si nos envian una imagen nueva
        if(req.file) {
            newSongData.image = req.file.path;
            newSongData.imgId = req.file.filename;

            if(oldSong.imgId){
                await deleteImgCloudinary(oldSong.imgId);
            }
        } else {
            // Si no hay imagen nueva, conservamos la que ya tenia
            newSongData.image = oldSong.imagen;
            newSongData.imgId = oldSong.imgId;
        }

        const songUpdated = await Song.findByIdAndUpdate(id, newSongData, { new: true });
        return res.status(200).json(songUpdated);

    } catch (error) {
        return res.status(400).json({ error: "Error al actualizar la cancion o imagen", detalles: error.message });
    }
};

// DELETE: Eliminar la cancion 
const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const songDeleted = await Song.findByIdAndDelete(id);

        if(!songDeleted) return res.status(404).json({ error: "Cancion no encontrada" });

        // Borramos la imagen de Cloudinary
        if(songDeleted.imgId){
            await deleteImgCloudinary(songDeleted.imgId);
        }

        return res.status(200).json({ message: "Cancion eliminada correctamente", song: songDeleted });
    } catch (error) {
        return res.status(400).json({ error: "Error al eliminar la cancion", detalles: error.message });
    }
};



module.exports = { getSongs, createSong, updateSong, deleteSong  }