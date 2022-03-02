const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medallaSchema = new Schema({
    user: String,
    pass: String
})

//Creamos el modelo
const Sesion = mongoose.model('sesion', medallaSchema, "usuarios");

module.exports = Sesion;