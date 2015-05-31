/**
 * This prototype is responsible to create a sound.
 *
 * @author madureira
 *
 * @param {Function} fn
 * @param {undefined} undefined
 *
 */
Game.define('Sound', 'engine/sound', (function(fn, undefined) {
    'use strict';

    var SOUND_PATH = Game.settings.path.assets.sound;
    var SoundUI;


    // Default contructor
    fn  = function(options) {
        SoundUI = Game.engine.ui.sound.Sound;

        var defaultSettings = {
            id: '',
            autoplay: false,
            repeat: false,
            whenFinish: null
        };

        var settings = Game.Helpful.mergeObjects(options, defaultSettings);

        this.id         = settings.id;
        this.mp3        = SOUND_PATH + this.id + '.mp3';
        this.ogg        = SOUND_PATH + this.id + '.ogg';
        this.autoplay   = settings.autoplay;
        this.repeat     = settings.repeat;
        this.whenFinish = settings.whenFinish;

        var soundUi = new SoundUI({
            id: this.id,
            mp3: this.mp3,
            ogg: this.ogg,
            autoplay: this.autoplay
        });

        this._soundControl = soundUi;

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
