const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medallaSchema = new Schema({
    nombre: String,
    lider: String
})

//Creamos el modelo
const Medalla = mongoose.model('medallas', medallaSchema, "medallas");

module.exports = Medalla;