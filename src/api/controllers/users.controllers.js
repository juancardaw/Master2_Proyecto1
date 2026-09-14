const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt.util");
const { deleteImgCloudinary } = require("../../utils/cloudinary.util");

// 1. REGISTRO (Siempre rol "user")
const register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        
        // Forzamos que el rol sea siempre "user" (evita hackeos)
        newUser.role = "user";

        // Encriptamos la contraseña
        newUser.password = bcrypt.hashSync(req.body.password, 10);

        // Guardamos la imagen
        if (req.file) {
            newUser.image = req.file.path;
            newUser.imgId = req.file.filename;
        }

        const createdUser = await newUser.save();
        return res.status(201).json(createdUser);
    } catch (error) {
        if (req.file) await deleteImgCloudinary(req.file.filename);
        return res.status(400).json({ error: "Error al registrarse", message: error.message });
    }
};

// 2. LOGIN
const login = async (req, res) => {
    try {
        const userInfo = await User.findOne({ email: req.body.email });
        if (!userInfo) return res.status(404).json({ error: "Usuario no encontrado" });

        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = generateSign(userInfo._id, userInfo.email);
            return res.status(200).json({ user: userInfo, token });
        } else {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Error en el login", message: error.message });
    }
};

// 3. CAMBIAR ROL (Solo Admin)
const updateRole = async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario a modificar
        const { role } = req.body; // Nuevo rol

        // Regla: Solo un admin puede cambiar roles
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "No tienes permisos de administrador" });
        }

        const userUpdated = await User.findByIdAndUpdate(id, { role }, { new: true });
        return res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).json({ error: "Error al actualizar rol", message: error.message });
    }
};

// 4. AÑADIR CANCIÓN FAVORITA (Sin duplicados y sin sobreescribir)
const addFavoriteSong = async (req, res) => {
    try {
        const { songId } = req.body;

        // $addToSet de Mongoose añade al array solo si no existe ya (evita duplicados)
        const userUpdated = await User.findByIdAndUpdate(
            req.user._id, // Actualiza al usuario logueado
            { $addToSet: { favoriteSongs: songId } },
            { new: true }
        ).populate("favoriteSongs");

        return res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).json({ error: "Error al añadir favorita", message: error.message });
    }
};

// 5. ELIMINAR USUARIO (Reglas estrictas)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Regla: El usuario normal no puede borrar otra cuenta que no sea la suya
        if (req.user.role !== "admin" && req.user._id.toString() !== id) {
            return res.status(403).json({ error: "No puedes borrar la cuenta de otro usuario" });
        }

        const userDeleted = await User.findByIdAndDelete(id);
        
        if (userDeleted && userDeleted.imgId) {
            await deleteImgCloudinary(userDeleted.imgId);
        }

        return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        return res.status(400).json({ error: "Error al eliminar usuario", message: error.message });
    }
};

module.exports = { register, login, updateRole, addFavoriteSong, deleteUser };