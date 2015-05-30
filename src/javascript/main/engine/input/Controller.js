/**
 * This prototype is responsible to the entire control of the game.
 *
 * @author madureira
 *
 */
Game.define('Controller', 'engine/input', (function(fn, undefined) {
    'use strict';

    var KEYBOARD = {
        UP: [38, 87],
        DOWN: [40, 83],
        RIGHT: [39, 68],
        LEFT: [37, 65]
    };

    // Default contructor
    fn = function() {
        Logger.info('Initing controller');

        // move to up
        this.up = false;

        // move to down
        this.down = false;

        // move to right
        this.right = false;

        // move to left
        this.left = false;
    };

    /**
     * Create the listener to keyboard input.
     *
     * @return void
     *
     */
    fn.prototype.listening = function() {
        var self = this;

        document.onkeydown = function(e) {
            e = e || window.event;

            switch (e.keyCode) {
                case KEYBOARD.UP[0]:
                case KEYBOARD.UP[1]:
                    self.up = true;
                    break;

                case KEYBOARD.DOWN[0]:
                case KEYBOARD.DOWN[1]:
                    self.down = true;
                    break;

                case KEYBOARD.RIGHT[0]:
                case KEYBOARD.RIGHT[1]:
                    self.right = true;
                    break;

                case KEYBOARD.LEFT[0]:
                case KEYBOARD.LEFT[1]:
                    self.left = true;
                    break;
            };
        };


        document.onkeyup = function(e) {
            e = e || window.event;

            switch (e.keyCode) {
                case KEYBOARD.UP[0]:
                case KEYBOARD.UP[1]:
                    self.up = false;
                    break;

                case KEYBOARD.DOWN[0]:
                case KEYBOARD.DOWN[1]:
                    self.down = false;
                    break;

                case KEYBOARD.RIGHT[0]:
                case KEYBOARD.RIGHT[1]:
                    self.right = false;
                    break;

                case KEYBOARD.LEFT[0]:
                case KEYBOARD.LEFT[1]:
                    self.left = false;
                    break;
            };
        };
    };


    return fn;

}));
