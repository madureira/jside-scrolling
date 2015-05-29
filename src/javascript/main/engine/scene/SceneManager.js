Game.define('SceneManager', 'engine/scene', (function(fn, undefined) {
    'use strict';

    var GameImage;

    fn = function() {
        GameImage = Game.engine.components.GameImage;
    };

    fn.prototype.init = function(stage) {
        Logger.info('Init scene');

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
                horzImage.clearStage();

                horzImage.draw();
                horzImage.x -= 1;

                bkgImage.draw();
                bkgImage.x -= 3;

                lvlImage.draw();
                lvlImage.x -= 5;

            }, 1000 / Game.settings.FPS);

        }, 100);

    };


    return fn;

}));
