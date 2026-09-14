# 🎵 Proyecto 1 - Backend (API REST de Música)

Este es el proyecto final del módulo de NodeJS y Backend. Consiste en una API RESTful desarrollada con Node.js y Express para gestionar un catálogo de canciones y usuarios con diferentes roles, incluyendo autenticación y subida de archivos.

## 🛠️ Tecnologías Utilizadas

* **Entorno de ejecución:** Node.js
* **Framework web:** Express
* **Base de datos:** MongoDB Atlas
* **ODM:** Mongoose
* **Gestión de imágenes:** Cloudinary y Multer
* **Seguridad y Autenticación:** JSON Web Token (JWT) y bcrypt

## 🚀 Instalación y Despliegue local

1. Clonar este repositorio en tu máquina local.
2. Abrir la terminal en la carpeta del proyecto e instalar las dependencias:
   ```bash
   npm install
   ```
3. *(Nota para corrección)*: El archivo `.env` se ha incluido en el repositorio por requerimiento del enunciado escolar para facilitar las pruebas.
4. Ejecutar el script semilla (Seeder) para cargar las canciones iniciales en la base de datos:
   ```bash
   node src/utils/seeds/songs.seed.js
   ```
5. Arrancar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## 🗂️ Modelos de Datos

### User (Usuario)
* `email`: Correo electrónico del usuario (único).
* `password`: Contraseña encriptada.
* `role`: Rol del usuario (`user` por defecto, o `admin`).
* `image`: URL de la imagen de perfil subida a Cloudinary.
* `imgId`: ID público de la imagen en Cloudinary (para su borrado).
* `favoriteSong`: Array de ObjectIds referenciando a la colección de canciones (sin duplicados gracias a `$addToSet`).

### Song (Canción)
* `title`: Título de la canción.
* `artist`: Artista o grupo musical.
* `genre`: Género musical.
* `year`: Año de lanzamiento.
* `image`: URL de la portada.
* `imgId`: ID público de la imagen.

## 🔐 Funcionalidades y Restricciones (Roles)

* **Creación de usuarios:** Todo usuario nuevo se registra con el rol `user`. El primer `admin` se configuró manualmente en MongoDB Atlas.
* **Gestión de roles:** Solo un usuario con rol `admin` puede ascender a otro usuario a `admin`. Un `user` no puede modificar roles.
* **Eliminación de cuentas:** 
  * Un `user` normal solo puede eliminar su propia cuenta.
  * Un `admin` puede eliminar cualquier cuenta.
* **Archivos Multimedia:** Al registrar un usuario, se sube su imagen de perfil a Cloudinary mediante un middleware. Si el usuario se elimina, su imagen se borra automáticamente de Cloudinary.

## 🌐 Endpoints Principales

### Usuarios (`/api/users`)
* `POST /register`: Registra un nuevo usuario (requiere enviar datos como `form-data` incluyendo la imagen).
* `POST /login`: Autentica al usuario y devuelve un token JWT.
* `DELETE /:id`: Elimina un usuario (y su imagen en Cloudinary). Protegido por roles.
* `PUT /:id/role`: Cambia el rol de un usuario (Solo Admin).

### Canciones (`/api/songs`)
* `GET /`: Devuelve todas las canciones.
* `GET /:id`: Devuelve una canción por su ID.
* `POST /`: Crea una nueva canción.
* `PUT /:id`: Actualiza los datos de una canción.
* `DELETE /:id`: Elimina una canción.