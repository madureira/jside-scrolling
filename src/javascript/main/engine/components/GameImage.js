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

    fn = function(context, options) {

        var defaultSettings = {
            imgSrc: '',
            posX: 0,
            posY: 0,
            width: 0,
            height: 0,
            infinity: false
        };

        var settings = Game.Helpful.mergeObjects(options, defaultSettings);

        this.context    = context;
        this.x          = settings.posX;
        this.y          = settings.posY;
        this.w          = settings.width;
        this.h          = settings.height;
        this.infinity   = settings.infinity;

        var img = new Image();
        img.src = '../bin/img/' + settings.imgSrc;

        this.image = img;
    };

    fn.prototype.draw = function() {
        if (this.infinity) {
            this.context.drawImage(this.image, this.x, this.y, this.w, this.h);

            this.secondPosX = this.w + this.x;

            if (this.x < Game.settings.viewport.width) {
                this.context.drawImage(this.image, this.secondPosX, this.y, this.w, this.h);
                var pos = Game.settings.viewport.width - Math.abs(this.x);
                var size = Game.settings.viewport.width - this.w;

                if (pos <= size) {
                    this.x = this.secondPosX;
                }
            }

        } else {
            this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
        }
    };

    fn.prototype.clearStage = function() {
        this.context.clearRect(0, 0, Game.settings.viewport.width, Game.settings.viewport.height);
    };

    return fn;

}));
