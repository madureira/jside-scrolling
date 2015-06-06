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
        _mappingButtons(this);
    };

    fn.prototype.check = function() {
        _mappingButtons(this);
    };

    function _mappingButtons(self) {
        var gp = _getGamepad();

        if (gp !== undefined) {
            for(var i=0; i <= 1; i++) {
                if (gp.axes[0] === AXES.RIGHT) {
                    self.right = true;
                    self.left = false;
                } else if (gp.axes[0] === AXES.LEFT) {
                    self.left = true;
                    self.right = false;
                }

                if (gp.axes[1] === AXES.UP) {
                    self.up = true;
                    self.down = false;
                } else if (gp.axes[1] === AXES.DOWN) {
                    self.down = true;
                    self.up = false;
                }


                if (gp.axes[0] === 0) {
                    self.right = false;
                    self.left = false;
                }

                if (gp.axes[1] === 0) {
                    self.up = false;
                    self.down = false;
                }
            }
        }
    }

    function _getGamepad() {
        return navigator.getGamepads()[0];
    }


    return fn;

}));
