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

    fn = function(context, imgSrc, posX, posY, width, height, callback) {
        this.context = context;
        this.x = posX;
        this.y = posY;
        this.w = width;
        this.h = height;

        var img = new Image();
        img.src = '../bin/img/' + imgSrc;

        this.image = img;
        this.image.onload = function () {
            callback();
        };
    };

    fn.prototype.draw = function() {
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    };

    return fn;

}));
