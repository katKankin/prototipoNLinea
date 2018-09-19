// notas: 
// .json devuelve res en un json
// AQUÍ ESTÁN LOS ENDPOINTS DEL JUEGO
// SE ESTÁ USANDO ESTE FRAMEWORK, ESTO SON PUROS IMPORTS
var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// usando modelo de juego
// instancia del modelo 
var Game = require('../models/Game');
var game;

// endpoints
// BÁSICAMENTE DICE CUANDO SE HAGA UN .get A ESTA RUTA HAGA ESTO:
app.get('/', function(req, res) {

    // .json devuelve res en un json
    res.status(200).json({
        ok: true,
        mensaje: 'OK GET GAME!!'
    });
});
// NOSOTROS ESTAMOS TRABAJANDO ESTA PARA CREAAR LA MATRIZ 
// AQUÍ ES DONDE SE VA SETEAR LA MATRIZ LOGICA Y SE ENVIARÁ AL FRONT END PARA QUE SE PINTE
// SE RECIBE COMO UN JSON, SE PARSEAN LOS DATOS A TIPO MODELO, LUEGO SE ENVÍA EN FORMATO JSON DE NUEVO AL 
// FRONT END
app.post('/setGame', function(req, res) {

    // console.log(req.body.size);
    game = new Game(req.body.size, req.body.toWin);
    game.createBoard();
    // setteo la configuración del tablero que viene desde el front req.body.n
    //game.matrix = req.body.matrix; // se asigna lo que viene desde el front, probar desde angular

    // console.log(game.matrix);
    // AQUÍ DEVUELVO EL JSON Y SI TODO SALE BIEN
    // SE SETEA EL TIPO DE STATUS QUE INDICA EL ESTADO DEL REQUEST
    // AQUÍ ESTOY FORMANDO MI .JSON COMO QUIERO Q SE RECIBA EN EL FRONT END.
    // DESDE ALLÁ SE UTILIZARÁN LOS PARÁMETROS COMO SEA...
    res.status(200).json({
        ok: true,
        mensaje: 'OK SET GAME!!',
        matrix: game.matrix,
        size: game.size
    });
});

app.post('/makePlay', function(req, res) {
    /* game.coordX = req.body.coordX;
    game.coordY = req.body.coordY; */
    game.tryPlay(req.body.coordX, req.body.coordY);
    res.status(200).json({
        ok: true,
        mensaje: 'OK PLAY GAME!!',
        coordX: game.coordX,
        coordY: game.coordY,
        matrix: game.matrix,
        jugada: game.jugada,
        win: game.win,
        turno: game.turno
    });
});
module.exports = app;