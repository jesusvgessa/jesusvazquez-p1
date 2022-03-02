const express = require('express');
const router = express.Router();
const Medalla = require('../models/medallas');

router.get('/', async(req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayMedallasDB = await Medalla.find();
        console.log(arrayMedallasDB);
        res.render("medallas", {
            arrayMedallas: arrayMedallasDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearMedalla', (req, res) => {
    res.render('crearMedalla')
})

router.post('/', async(req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
        //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const medallaDB = new Medalla(body) //Creamos un nuevo Pokemon, gracias al modelo
        await medallaDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/medallas') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
        //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const medallaDB = await Medalla.findOne({ _id: id }) //_id porque así lo indica Mongo
            //Esta variable “Pokemon” está definida arriba con el “require”
            //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(medallaDB) //Para probarlo por consola
        res.render('detalleMedalla', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            medalla: medallaDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleMedalla', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Medalla no encontrado!'
        })
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const medallasDB = await Medalla.findByIdAndDelete({ _id: id });
        console.log(medallasDB)
            // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
            // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!medallasDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el Pokémon.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Medalla eliminado.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const medallasDB = await Medalla.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(medallasDB)
        res.json({
            estado: true,
            mensaje: 'Medalla editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Pokémon'
        })
    }
})

module.exports = router;