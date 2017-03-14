/*
  carbon = 800
  timeFrom 20
  timeTo 7
  maxCarbon 1500 //Lights off time
*/
var carbon = function() {
    var gpio = require('./relay').Relay;
    var moment = require('moment')
    var PIN = 7;
    var settings = require('../config');
    var FanController = require('./FanController')();
    var CheckDates = require('./TimeService').CheckDates;

    var coController = function(data) {
        if (settings.config.manual.status && data >= settings.config.manual.carbonOnStep) {
            console.log("Fan turn on CARBON ", data)
            FanController.on();
        } else {
            if (CheckDates(settings.config.lightOn, settings.config.lightOff) && !settings.config.tmpStepStatus ) {
                lightOn(data);
            } else {
                lightOff(data);
            }
        }
    }

    function lightOn(data) {
        if (data <= settings.config.carbon && data != 0) {
            coON();
        } else {
            coOFF();
        }
        console.log("Fan turn of ", data)
        FanController.off();
    }

    function lightOff(data) {
        if (data >= settings.config.fanOnStep) {
            console.log("Fan turn on CARBON1 ", data)
            FanController.on();
        }
        coOFF();
    }

    function coON() {
        settings.config.statuses['carbon'] = true;
        gpio(PIN, false);
    }

    function coOFF() {
        settings.config.statuses['carbon'] = false;
        gpio(PIN, true);
    }

    return coController;
};

module.exports = carbon;