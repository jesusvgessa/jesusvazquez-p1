const express = require('express') //Requerimos Express
const bodyParser = require('body-parser')
const app = express() //Variable para utilizar lo que estamos requiriendo

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000 //Habitualmente el 3000 para entorno locales

//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
// const user = 'jesusvgessa';
// const password = 'bZ1SXzfy2vrqruGl';
// const dbname = 'pokemon';
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5lmbo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

//Motor de plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'))

//Llamadas a las rutas:
app.use('/', require('./router/rutas'));
app.use('/pokemon', require('./router/pokemon'));
app.use('/medallas', require('./router/medallas'));
app.use('/login', require('./router/login'));

// app.get('/', (req, res) => {
//   res.render("index", {titulo : "mi titulo dinámico"})
// })

// app.get('/contacto', (req, res) => {
//   res.render("contacto", {tituloContacto : 'Estas en contacto de manera dinamica!'})
// })

app.use((req, res) => {
    res.status(404).render("404", {
        titulo: "Error 404",
        descripcion: "Page Not Found"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})