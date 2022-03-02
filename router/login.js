const express = require('express');
const router = express.Router();
const User = require('../models/login');

router.get('/', async(req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayUsuariosDB = await User.find();
        console.log(arrayUsuariosDB);
        res.render("login", {
            arrayUsuarios: arrayUsuariosDB
        })
    } catch (error) {
        console.error(error)
    }
})



module.exports = router;