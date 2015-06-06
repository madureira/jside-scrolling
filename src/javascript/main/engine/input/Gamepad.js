/**
 * This prototype is responsible to configure gamepad and register the triggers.
 *
 * @author madureira
 *
 */
Game.define('Gamepad', 'engine/input', (function(fn, undefined) {
    'use strict';


    var BUTTON = {
        UP: [38, 87],
        DOWN: [40, 83],
        RIGHT: [39, 68],
        LEFT: [37, 65]
    };

    var AXES = {
        UP: -1,
        DOWN: 1,
        RIGHT: 1,
        LEFT: -1
    };


    fn = function() {
        Logger.info('Configuring gamepad controller');

        // move to up
        this.up = false;

        // move to down
        this.down = false;

        // move to right
        this.right = false;

        // move to left
        this.left = false;

    };

    fn.prototype.init = function() {
        console.log('GAMEPAD');
        _mappingButtons()
    };

    function _mappingButtons() {
        var gp = _getGamepad();

        var $pad = document.getElementById('pad');

        setInterval(function() {
            for(var i=0; i < gp.axes.length; i++) {
                if (gp.axes[1] === AXES.UP) {
                    this.up = true;
                    this.down = false;
                } else if (gp.axes[1] === AXES.DOWN) {
                    this.down = true;
                    this.up = false;
                }

                if (gp.axes[0] === AXES.RIGHT) {
                    this.right = true;
                    this.left = false;
                } else if (gp.axes[1] === AXES.LEFT) {
                    this.left = true;
                    this.right = false;
                }
            }
        }, 100);
    }

    function _getGamepad() {
        return navigator.getGamepads()[0];
    }


    return fn;

}));
