var settings = require('../config');

function Init() {
    /**
     * Initiate Rpio
     */
    // var rpio = require('pigpio');
    /**
     * Initiate Socket IO
     */
    socket = require('./socketio')();
    /*
    Initiate Driver Carbon, Humidity & Temp System
     */
    var cozirDriver = require('./cozirDriver')();

    /*
    Initiate Watering System
     */
    var WaterController = require('./WaterController')();

    /*
    Initiate Light Timer
     */
    var LightController = require('./LightController')();
}

/*
Initiate GPIO ports
 */
var gpioReady = require('./relay').Init;

gpioReady(Init);