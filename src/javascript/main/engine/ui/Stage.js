/**
 * Responsible to build and render the stage.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Stage', 'engine/ui', (function(fn, undefined) {
    'use strict';

    fn.prototype.init = function() {
        console.log('Building stage...');

        var stageUI = Game.templates.stage();

        var $stage = document.getElementById('stage');
        $stage.insertAdjacentHTML('beforeend', stageUI);
    };

    return fn;

}));
