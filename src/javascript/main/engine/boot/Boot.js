/**
 * Responsible to boot the game.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Boot', 'engine/boot', (function(fn, undefined) {
    'use strict';

    var Stage;

    // constructor
    fn = function() {
        // importing Stage
        Stage = Game.engine.ui.stage.Stage;
    };

    fn.prototype.init = function() {
        Logger.info('Booting...');

        var stage = new Stage();
        stage.init();
        stage.buildScene();

        // init example
        //init();
    };

    return fn;

}));
