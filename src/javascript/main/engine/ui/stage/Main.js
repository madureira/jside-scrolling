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
        Logger.info('Building stage...');

        var viewport = Game.templates.stage_viewport({
            width: Game.settings.viewport.width, height: Game.settings.viewport.height
        });
        var mainStage = Game.templates.stage_main({ "viewport": viewport } );

        var $stage = Game.$.byId('stage');
        $stage.insertAdjacentHTML('beforeend', mainStage);
    };

    return fn;

}));
