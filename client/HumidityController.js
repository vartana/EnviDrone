var humidity = function() {
    var gpio = require('./relay').Relay;
    var PIN = 13;
    var settings = require('../config');
    var FanController = require('./FanController')();

    var ON = function() {
        gpio(PIN, false);
    }

    var OFF = function() {
        gpio(PIN, true);
    }

    var analyze = function(data) {
        if (settings.config.manual.status && data >= settings.config.manual.humidityOnStep) {
            console.log("Fan turn on HUMIDITY ", data)
            FanController.on();
        }
        
        if (data >= settings.config.humidity) {
            ON();
        } else {
            OFF();
        }
    }

    return analyze;

};

module.exports = humidity;