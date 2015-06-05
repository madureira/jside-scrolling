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
        controller = null,
        connectedGamepad = false;


    fn = function() {
        Logger.info('Initing controller');

        Keyboard = Game.engine.input.Keyboard;
        Gamepad = Game.engine.input.Gamepad;

        _updateConnectedGamepad();

        return _availableController();
    };

    function _updateConnectedGamepad() {
        console.log('Listener');
        var hasGP = setInterval(function() {
            if (_getGamepad() !== undefined) {
                connectedGamepad = true;
                console.log('tem controle');
            } else {
                console.log('Nao tem controle');
            }
        }, 1000);
    }

    function _availableController() {
        Logger.info('Selecting the available controller');

        if (!_hasGamepadSupport()) {
            controller = new Gamepad();
        } else {
            controller = new Keyboard();
        }

        controller.init();

        return controller;
    };

    function _getGamepad() {
        return navigator.getGamepads()[0];
    }

    function _hasGamepadSupport() {
        return "getGamepads" in navigator;
    }


    return fn;

}));
