// parse application/x-www-form-urlencoded
// configuración de la librería para hacer pruebas en postman con posts
// todo lo que lleva el body lo crea objeto javascripts
var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express(); // definiendo el server

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// importar rutas:
var juegoRoutes = require('./routes/game');
var appRoutes = require('./routes/app');



// cada vez que se haga una petición a esa ruta haga appRoutes

app.use('/game', juegoRoutes);
app.use('/', appRoutes);

// escuchar peticiones:
app.listen(3000, function() {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'ONLINE');
});