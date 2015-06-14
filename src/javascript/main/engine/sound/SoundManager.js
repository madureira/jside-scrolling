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

        var event = new Event('ended');

        // play next sound
        if (Game.Helpful.isObject(sound.whenFinish)) {
            var nextSound = sound.whenFinish;

            var element = Game.$.byId('sound-' + sound.id);

            element.addEventListener('ended', function (e) {
                nextSound.play();
            });

            if (sound.repeat) {
                var el = Game.$.byId('sound-' + nextSound.id);

                el.addEventListener('ended', function(e) {
                    setTimeout(function() {
                        sound.play();
                    }, 3000);
                });
            }
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
