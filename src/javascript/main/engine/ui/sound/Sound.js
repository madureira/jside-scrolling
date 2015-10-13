/**
 * Responsible to build the markup to sound.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Sound', 'engine/ui/sound', (function(fn, undefined) {
    'use strict';

    /**
     * Put the sound on the HTML.
     *
     * @param {JSON} sound
     *
     * @return void
     *
     */
    fn  = function(sound) {
        var soundTemplate = Game.templates.sound_markup(sound);
        var autoplay = sound.autoPlay;
        var $sounds = Game.$.byId('sounds');

        $sounds.insertAdjacentHTML('beforeend', soundTemplate);
        this._soundControl = Game.$.byId('sound-' + sound.id);

        return this;
    };

    fn.prototype.play = function() {
        this._soundControl.play();
    };

    fn.prototype.stop = function() {
        this._soundControl.stop();
    };

    return fn;

}));
