/**
 * This prototype is responsible to manager the sound of the game.
 *
 * @author madureira
 *
 * @param {Function} fn
 * @param {undefined} undefined
 *
 */
Game.define('SoundManager', 'engine/sound', (function(fn, undefined) {
    'use strict';

    // Default contructor
    fn = function() {
        Logger.info('Initing the sound...');

        this.sounds = [];
    }

    fn.prototype.add = function(sound) {
        this.sounds.push(sound);

        // play next sound
        if (sound.whenFinish !== null && sound.whenFinish !== undefined && (typeof sound.whenFinish === 'object')) {
            var nextSound = sound.whenFinish;

            var event = new Event('ended');

            var element = Game.$.byId('sound-' + sound.id);

            element.addEventListener('ended', function (e) {
                nextSound.play();
            });
        }
    };

    fn.prototype.play = function() {
        for (var sound in this.sounds) {
            sound = this.sounds[sound];
            if (sound.autoplay) {
                sound.play();
            }
        }
    };

    return fn;

}));
