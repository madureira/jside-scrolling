Game.define('SceneManager', 'engine/scene', (function(fn, undefined) {
    'use strict';

    var GameImage;

    fn = function() {
        GameImage = Game.engine.components.GameImage;
    };

    fn.prototype.init = function(stage) {
        Logger.info('Init scene');

        var ctx = stage.context2D;

        var levelImage = {
            imgSrc: 'level/1-1.png',
            width: 5376,
            height: 512
        };

        var backgroundImage = {
            imgSrc: 'parallax/jungle-trees-fill-dark-2.png',
            height: 512,
            width: 512
        };

        var horizonImage = {
            imgSrc: 'parallax/jungle-sky-2x.png',
            width: 512,
            height: 448
        };

        var horzImage = new GameImage(ctx, horizonImage);
        var bkgImage = new GameImage(ctx, backgroundImage);
        var lvlImage = new GameImage(ctx, levelImage);

        setTimeout(function() {

            setInterval(function() {
                ctx.clearRect(0, 0, Game.settings.viewport.width, Game.settings.viewport.height);
                horzImage.draw();
                horzImage.x -= 2;

                bkgImage.draw();
                bkgImage.x -= 3;

                lvlImage.draw();
                lvlImage.x -= 5;
            }, 100);

        }, 500);
    };


    return fn;

}));
