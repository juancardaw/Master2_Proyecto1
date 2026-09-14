// Este middleware comprobará si el usuario está logueado y pasará sus datos al controlador.

const User = require("../models/user.model");
const { verifyJwt } = require("../../utils/jwt.util");

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ error: "No estás autorizado" });

        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        
        const userLogued = await User.findById(validToken.id);
        
        // Escondemos la contraseña por seguridad antes de pasar el usuario
        userLogued.password = null; 
        req.user = userLogued; // Guardamos el usuario en la petición
        next();
    } catch (error) {
        return res.status(401).json({ error: "Fallo al autenticar", message: error.message });
    }
};

module.exports = { isAuth };