/**
 * Responsible to build and render the stage.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Main', 'engine/ui/stage', (function(fn, undefined) {
    'use strict';

    fn.prototype.init = function() {
        console.log('Building stage...');

        var viewport = Game.templates.stage_viewport();
        var mainStage = Game.templates.stage_main({ "viewport": viewport } );

        var $stage = document.getElementById('stage');
        $stage.insertAdjacentHTML('beforeend', mainStage);
    };

    return fn;

}));
