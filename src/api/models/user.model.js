// Modelo el usuario
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        emun: ["user", "admin"],
        default: "user"
    },
    image: { type: String, required: true },
    imgId: { type: String },
    favoriteSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }] //Array de datos procedente de la coleccion de las canciones 
}, {
    timestamps: true
});



module.exports = mongoose.model("User", userSchema);