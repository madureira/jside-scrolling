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

    fn.prototype.init = function() {
        Logger.info('Booting...');

        var Stage = Game.engine.ui.stage.Main,
        stage = new Stage();
        stage.init();

        init();
    };

    return fn;

}));
