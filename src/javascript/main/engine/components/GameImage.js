/**
 * Responsible to create an image.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('GameImage', 'engine/components', (function(fn, undefined) {
    'use strict';

    var STAGE_WIDTH = Game.settings.viewport.width,
        STAGE_HEIGHT = Game.settings.viewport.height;

    fn = function(context, options) {

        var defaultSettings = {
            imgSrc: '',
            posX: 0,
            posY: 0,
            width: 0,
            height: 0,
            limitUp: 0,
            limitDown: 0,
            limitLeft: 0,
            limitRight: 0
        };

        var settings = Game.Helpful.mergeObjects(options, defaultSettings);

        this.context    = context;
        this.x          = settings.posX;
        this.y          = settings.posY;
        this.w          = settings.width;
        this.h          = settings.height;
        this.lmtU       = settings.limitUp;
        this.lmtD       = settings.limitDown;
        this.lmtL       = settings.limitLeft;
        this.lmtR       = settings.limitRight;

        var img = new Image();
        img.src = Game.settings.path.assets.image + settings.imgSrc;

        this.image = img;
    };

    fn.prototype.draw = function() {
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    };

    fn.prototype.clearStage = function() {
        this.context.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    };

    return fn;

}));
