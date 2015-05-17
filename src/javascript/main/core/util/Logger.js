/**
 * The system log.
 *
 * @author madureira
 *
 */
Logger = {

    info: function(message) {
        if (Game.settings.isLoggerEnabled) {
            console.log(message);
        }
    },

    debug: function(emitter, message) {
        if (Game.settings.isLoggerEnabled) {
            console.debug('DEBUG: ' + emitter + ' >\t', message);
        }
    }

};
