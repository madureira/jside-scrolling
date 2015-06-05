/**
 * This prototype is responsible to the entire control of the game.
 *
 * @author madureira
 *
 */
Game.define('Controller', 'engine/input', (function(fn, undefined) {
    'use strict';

    var Keyboard,
        Gamepad;


    fn = function() {
        Logger.info('Initing controller');

        Keyboard = Game.engine.input.Keyboard;
        Gamepad = Game.engine.input.Gamepad;

        return _availableController();
    };

    function _availableController() {
        Logger.info('Selecting the available controller');

        var controller = null;

        console.log(_getGamepad());

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
