Game.define('SceneManager', 'engine/scene', (function(fn, undefined) {
    'use strict';

    var GameImage;

    fn = function() {
        GameImage = Game.engine.components.GameImage;
    };

    fn.prototype.init = function(stage) {
        Logger.info('Init scene');

        //var image = 'parallax/jungle-sky-2x.png';
        var image = 'level/1-1.png';

        //var image = 'parallax/jsplatformer4_b0.png';

        var width = 5376;
        var height = 512;
        //var width = 1694;
        //var height = 320;

        var context = stage.context2D;
        var gameImage = new GameImage(stage.context2D, image, 0, 0, width, height, function() {
            gameImage.draw();
        });

    };

    return fn;

}));
