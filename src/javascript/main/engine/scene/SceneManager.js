Game.define('SceneManager', 'engine/scene', (function(fn, undefined) {
    'use strict';

    var GameImage;
    var Controller;

    fn = function() {
        GameImage = Game.engine.components.GameImage;
        Controller = Game.engine.input.Controller;
    };

    fn.prototype.init = function(stage) {
        Logger.info('Init scene');

        var controller = new Controller();
        controller.listening();

        var ctx = stage.context2D;

        var horzImage = new GameImage(ctx, {
            imgSrc: 'parallax/jungle-sky-2x.png',
            width: 610,
            height: 448,
            infinity: true
        });

        var bkgImage = new GameImage(ctx, {
            imgSrc: 'parallax/jungle-trees-fill-dark-2.png',
            height: 512,
            width: 600,
            infinity: true
        });

        var lvlImage = new GameImage(ctx, {
            imgSrc: 'level/1-1.png',
            width: 5376,
            height: 512
        });

        setTimeout(function() {

            setInterval(function() {
                _clearStage(horzImage);

                _moveTexture(horzImage, controller, 1);
                _moveTexture(bkgImage, controller, 2);
                _moveTexture(lvlImage, controller, 5);

            }, 1000 / Game.settings.FPS);

        }, 100);

    };

    function _moveTexture(image, controller, speed) {
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
