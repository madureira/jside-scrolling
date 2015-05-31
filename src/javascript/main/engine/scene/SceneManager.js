Game.define('SceneManager', 'engine/scene', (function(fn, undefined) {
    'use strict';

    var GameImage;
    var Controller;

    var HORIZON_SPEED = 5;
    var BACKGROUND_SPEED = 8;
    var LEVEL_SPEED = 12;

    var SCREEN_SCALE = 1.9;

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
        ctx.scale(SCREEN_SCALE, SCREEN_SCALE);

        var horizonParallax = new GameImage(ctx, {
            imgSrc: 'parallax/jungle-sky-2x.png',
            width: 610,
            height: 448,
            posY: -60,
            limitUp: -60,
            limitDown: -100,
            limitLeft: 0,
            limitRight: 1000,
            infinity: true
        });

        var backgroundParallax = new GameImage(ctx, {
            imgSrc: 'parallax/jungle-trees-fill-dark-2.png',
            height: 512,
            width: 600,
            posY: -125,
            limitUp: -125,
            limitDown: -180,
            limitLeft: 0,
            limitRight: 1000,
            infinity: true
        });

        var levelImage = new GameImage(ctx, {
            imgSrc: 'level/1-1.png',
            width: 5376,
            height: 512,
            limitUp: 0,
            limitDown: -230,
            limitLeft: 0,
            limitRight: -5049
        });


        setTimeout(function() {

            setInterval(function() {
                console.log('>> ' + levelImage.x);

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

        if (controller.up) {
            image.y += speed;
        } else if (controller.down) {
            image.y -= speed;
        }

        if (image.lmtU <= image.y) {
            image.y = image.lmtU;
        } else if (image.lmtD >= image.y) {
            image.y = image.lmtD;
        }

        if (image.x >= image.lmtL) {
            image.x = image.lmtL;
        } else if (image.x <= image.lmtR) {
            image.x = image.lmtR;
        }
    }

    function _clearStage(imageRef) {
        imageRef.clearStage();
    }


    return fn;

}));
