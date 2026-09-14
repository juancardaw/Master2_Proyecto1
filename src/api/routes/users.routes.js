// Las rutas del usuario

const express = require("express");
const upload = require("../middlewares/file");
const { isAuth } = require("../middlewares/auth");
const { register, login, updateRole, addFavoriteSong, deleteUser } = require("../controllers/users.controllers");

const router = express.Router();

// RUTAS
// isAuth para proteger las rutas que requieren estar logueado.
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.put("/favorites", isAuth, addFavoriteSong); // Usuario logueado añade canción
router.put("/:id/role", isAuth, updateRole); // Protegido (el controlador comprueba si es admin)
router.delete("/:id", isAuth, deleteUser); // Protegido por reglas de borrado

module.exports = router;