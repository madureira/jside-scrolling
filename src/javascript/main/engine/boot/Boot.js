/**
 * Responsible to boot the game.
 *
 * @param fn context
 * @param undefined undefined
 *
 * @author madureira
 *
 */
Game.define('Boot', 'engine/boot', (function(fn, undefined) {
    'use strict';

    fn.prototype.init = function() {
        console.log('Booting...');
    };

    return fn;

}));
