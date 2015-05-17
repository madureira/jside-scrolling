/**
 * Responsible to build and render the stage.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Stage', 'engine/ui/stage', (function(fn, undefined) {
    'use strict';

    var Scene;

    // constructor
    fn = function() {
        this.canvas = null;
        this.context2D = null;
        this.backBuffer = null;
        this.backBufferContext2D = null;

        // import scene manager
        Scene = Game.engine.scene.SceneManager;
    };

    fn.prototype.init = function() {
        Logger.info('Building stage...');

        var viewport = Game.templates.stage_viewport({
            width: Game.settings.viewport.width,
            height: Game.settings.viewport.height
        });

        var mainStage = Game.templates.stage_main({ "viewport": viewport } );

        var $stage = Game.$.byId('stage');
        $stage.insertAdjacentHTML('beforeend', mainStage);

        this.canvas = Game.$.byId('board');
        this.context2D = this.canvas.getContext('2d');
        this.backBuffer = document.createElement('canvas');
        this.backBuffer.width = this.canvas.width;
        this.backBuffer.height = this.canvas.height;
        this.backBufferContext2D = this.backBuffer.getContext('2d');
    };

    fn.prototype.buildScene = function() {
        var scene = new Scene();
        scene.init();
    };

    return fn;

}));
