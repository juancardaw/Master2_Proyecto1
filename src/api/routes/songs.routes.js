// Rutas de canciones
const express = require("express");
const upload = require("../middlewares/file");
const { getSongs, createSong, updateSong, deleteSong } = require("../controllers/songs.controllers");

const router = express.Router();

router.get("/", getSongs);
router.post("/", upload.single("image"), createSong);
router.put("/:id", upload.single("image"), updateSong);
router.delete("/:id", deleteSong);

module.exports = router;