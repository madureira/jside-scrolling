Game.define('SceneManager', 'engine/scene', (function(fn, undefined) {
    'use strict';

    var GameImage,
        Controller,
        Sound,
        SoundManager;


    var TIME_TO_START = 500, // miliseconds
        HORIZON_SPEED = 5,
        BACKGROUND_SPEED = 8,
        LEVEL_SPEED = 12,
        SCREEN_SCALE = 1.9;

    fn = function() {
        GameImage = Game.engine.components.GameImage;
        Controller = Game.engine.input.Controller;
        Sound = Game.engine.sound.Sound;
        SoundManager = Game.engine.sound.SoundManager;
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
            imgSrc: 'parallax/horizon_parallax.png',
            width: 10240,
            height: 512,
            posY: -80,
            limitUp: -60,
            limitDown: -100,
            limitLeft: 0,
            limitRight: -2100
        });

        var backgroundParallax = new GameImage(ctx, {
            imgSrc: 'parallax/tree_parallax.png',
            width: 10240,
            height: 512,
            posY: -100,
            limitUp: -125,
            limitDown: -180,
            limitLeft: 0,
            limitRight: -3355
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

        var soundTheme2 = new Sound({
            id: 'theme2-1-1',
            autoplay: false,
            repeat: false
        });

        var soundTheme = new Sound({
            id: 'theme-1-1',
            autoplay: true,
            repeat: false,
            whenFinish: soundTheme2
        });

        var soundManager = new SoundManager();
        soundManager.add(soundTheme2);
        soundManager.add(soundTheme);
        soundManager.play();


        setTimeout(function() {

            soundManager.play();

            setInterval(function() {

                _clearStage(horizonParallax);

                _moveImage(horizonParallax, controller, HORIZON_SPEED);
                _moveImage(backgroundParallax, controller, BACKGROUND_SPEED);
                _moveImage(levelImage, controller, LEVEL_SPEED);

            }, 1000 / Game.settings.FPS);

        }, TIME_TO_START);

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
