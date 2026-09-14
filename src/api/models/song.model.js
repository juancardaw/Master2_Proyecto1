// Creacion del modelo de canciones
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number },
    image: { type: String, required: true },
    imgId: { type: String }
}, {
    timestamps: true
});


module.exports = mongoose.model("Song", songSchema);
