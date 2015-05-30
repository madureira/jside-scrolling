Game.define('SceneManager', 'engine/scene', (function(fn, undefined) {
    'use strict';

    var GameImage;
    var Controller;

    var HORIZON_SPEED = 1;
    var BACKGROUND_SPEED = 2;
    var LEVEL_SPEED = 5;

    fn = function() {
        GameImage = Game.engine.components.GameImage;
        Controller = Game.engine.input.Controller;
    };

    /**
     * Responsible to put all elements in the scene.
     *
     * @param {Canvas} stage
     *
     * @return void
     *
     */
    fn.prototype.init = function(stage) {
        Logger.info('Init scene');

        var controller = new Controller();
        controller.listening();

        var ctx = stage.context2D;

        var horizonParallax = new GameImage(ctx, {
            imgSrc: 'parallax/jungle-sky-2x.png',
            width: 610,
            height: 448,
            infinity: true
        });

        var backgroundParallax = new GameImage(ctx, {
            imgSrc: 'parallax/jungle-trees-fill-dark-2.png',
            height: 512,
            width: 600,
            infinity: true
        });

        var levelImage = new GameImage(ctx, {
            imgSrc: 'level/1-1.png',
            width: 5376,
            height: 512
        });

        setTimeout(function() {

            setInterval(function() {
                _clearStage(horizonParallax);

                _moveImage(horizonParallax, controller, HORIZON_SPEED);
                _moveImage(backgroundParallax, controller, BACKGROUND_SPEED);
                _moveImage(levelImage, controller, LEVEL_SPEED);

            }, 1000 / Game.settings.FPS);

        }, 100);

    };

    function _moveImage(image, controller, speed) {
        image.draw();

        if (controller.right) {
            image.x -= speed;
        } else if (controller.left) {
            image.x += speed;
        }
    }

    function _clearStage(imageRef) {
        imageRef.clearStage();
    }


    return fn;

}));
