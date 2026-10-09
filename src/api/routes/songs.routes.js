// Rutas de canciones
const express = require("express");
const upload = require("../middlewares/file");
const { isAuth }= require("../middlewares/auth");
const { getSongs, createSong, updateSong, deleteSong } = require("../controllers/songs.controllers");

const router = express.Router();


// Rutas de caciones con autentificacion para la correccion 
router.get("/", getSongs);
router.post("/", isAuth, upload.single("image"), createSong);
router.put("/:id", isAuth, upload.single("image"), updateSong);
router.delete("/:id", isAuth, deleteSong);

module.exports = router;