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
        console.log('Booting...');

        var Stage = Game.engine.ui.Stage,
        stage = new Stage();
        stage.init();
    };

    return fn;

}));
