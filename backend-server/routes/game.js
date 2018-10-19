// SE ESTÁ USANDO ESTE FRAMEWORK
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
var UserData = require('../models/UserData');
var game;
var userdata;

// endpoints
app.get('/', function(req, res) {


    res.status(200).json({
        ok: true,
        mensaje: 'OK GET GAME!!'
    });
});

app.post('/setGame', function(req, res) {

    game = new Game(req.body.size, req.body.toWin);
    game.createBoard();
    game.setConfig(req.body.colorJ1, req.body.colorJ2, req.body.gameMode);

    res.status(200).json({
        ok: true,
        mensaje: 'OK SET GAME!!',
        matrix: game.matrix,
        colorJ1: game.colorJ1,
        colorJ2: game.colorJ2,
        gameMode: game.gameMode,
        size: game.size

    });
});
app.get('/getGame', function(req, res) {

    // console.log('GETGAME ENDPOINT: ', game.gameMode);

    res.status(200).json({
        ok: true,
        mensaje: 'OK GET THE GAME!!',
        matrix: game.matrix,
        colorJ1: game.colorJ1,
        colorJ2: game.colorJ2,
        gameMode: game.gameMode,
        size: game.size
    });
});
app.post('/makePlay', function(req, res) {

    // DEPENDE DE LO QUE TRAE EL FRONT END ASÍ VA LLAMAR A UNA FUNCIÓN
    // IF GAME MODE == 1, 2, 3, 4 --> CALL LEVEL FUNCTION

    game.tryPlay(req.body.coordX, req.body.coordY);

    /* if (game.gameMode == 1) {
        game.tryPlay(req.body.coordX, req.body.coordY);
    } else if (game.gameMode == 2) {
        game.tryPlayAut2(req.body.coordX, req.body.coordY);
    } */


    res.status(200).json({
        ok: true,
        mensaje: 'OK PLAY GAME!!',
        coordX: game.coordX,
        coordY: game.coordY,
        matrix: game.matrix,
        jugada: game.jugada,
        win: game.win,
        turno: game.turno,
        colorJ1: game.colorJ1,
        colorJ2: game.colorJ2,
        coordXA: game.coordXA,
        coordYA: game.coordYA
    });
});
app.post('/setUserData', function(req, res) {

    userdata = new UserData(req.body.userName);
    console.log(userdata.getUserData());
    res.status(200).json({
        ok: true,
        mensaje: 'OK USER DATA SET!!',
        userName: userdata.userName

    });
});
app.get('/getUserData', function(req, res) {

    var name = userdata.getUserData();


    // console.log(userdata.getUserData());
    res.status(200).json({

        name: name
    });
});
module.exports = app;