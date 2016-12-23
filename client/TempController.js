module.exports = (function() {
    var gpio = require('./relay').Relay;
    var settings = require('../config');
    var PINONE = 16;
    var PINTWO = 18;

    var OFF = function() {
        gpio(PINONE, true);
        gpio(PINTWO, true);
    }

    var analyze = function(data) {
        var tmp = (data.temp * 9 / 5) + 32;

        if (tmp >= settings.config.tmpStep) {
            OFF();
        }

    }

    return analyze;

})();