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
        connectedGamepad = false,
        gamepadIsConnected = false;


    fn = function() {
        Logger.info('Initing controller');

        this.controller = null;
        this.currentController = 'KEYBOARD';

        Keyboard = Game.engine.input.Keyboard;
        Gamepad = Game.engine.input.Gamepad;

        _initController(this);

        _updateConnectedGamepad(this);

        return this.controller;
    };

    function _updateConnectedGamepad(self) {
        console.log('Listener for controller change');

        setInterval(function() {
            if (_getGamepad() === undefined) {
                gamepadIsConnected = false;

                if (self.currentController !== 'KEYBOARD') {
                    self.currentController = 'KEYBOARD';
                    _initController(self);
                    console.log('KEYBOARD');
                }
            } else {
                gamepadIsConnected = true;

                if (self.currentController !== 'GAMEPAD') {
                    self.currentController = 'GAMEPAD';
                    _initController(self);
                    console.log('GAMEPAD');
                }
            }
        }, 1000);
    }

    function _initController(self) {
        Logger.info('Selecting the available controller');

        if (!_hasGamepadSupport() && gamepadIsConnected) {
            self.controller = new Gamepad();
        } else {
            self.controller = new Keyboard();
        }
    };

    function _getGamepad() {
        return navigator.getGamepads()[0];
    }

    function _hasGamepadSupport() {
        return "getGamepads" in navigator;
    }


    return fn;

}));
