/**
 * This prototype is responsible to the entire control of the game.
 *
 * @author madureira
 *
 */
Game.define('Controller', 'engine/input', (function(fn, undefined) {
    'use strict';

    var Keyboard,
        Gamepad,
        gamepadIsConnected = false;


    fn = function() {
        Logger.info('Initing controller');

        this.controller = null;
        this.currentController = 'KEYBOARD';

        Keyboard = Game.engine.input.Keyboard;
        Gamepad = Game.engine.input.Gamepad;

        _initController(this);
        _updateConnectedGamepad(this);
    };

    function _updateConnectedGamepad(self) {
        setInterval(function() {
            if (!_getGamepad()) {
                gamepadIsConnected = false;

                if (self.currentController !== 'KEYBOARD') {
                    self.currentController = 'KEYBOARD';
                    _initController(self);
                }
            } else {
                gamepadIsConnected = true;

                if (self.currentController !== 'GAMEPAD') {
                    self.currentController = 'GAMEPAD';
                    _initController(self);
                }
            }
        }, 1000);
    }

    function _initController(self) {
        if (_hasGamepadSupport() && gamepadIsConnected) {
            Logger.info('Selecting gamepad as default controller');
            self.controller = new Gamepad();
        } else {
            Logger.info('Selecting keyboard as default controller');
            self.controller = new Keyboard();
        }

        self.controller.init();
    };

    function _getGamepad() {
        return navigator.getGamepads()[0];
    }

    function _hasGamepadSupport() {
        return "getGamepads" in navigator;
    }


    return fn;

}));
