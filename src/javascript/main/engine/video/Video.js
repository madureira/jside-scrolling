/**
 * This prototype is responsible to create a video.
 *
 * @author madureira
 *
 * @param {Function} fn
 * @param {undefined} undefined
 *
 */
Game.define('Video', 'engine/video', (function(fn, undefined) {
    'use strict';

    var VIDEO_PATH = Game.settings.path.assets.video;
    var VideoUI;

    fn = function(options) {
        VideoUI = Game.engine.ui.video.Video;

        var defaultSettings = {
            id: '',
            autoplay: false,
            repeat: false,
            whenFinish: null
        };

        var settings = Game.Helpful.mergeObjects(options, defaultSettings);

        this.id         = settings.id;
        this.videoPath  = VIDEO_PATH + this.id;
        this.autoplay   = settings.autoplay;
        this.repeat     = settings.repeat;
        this.whenFinish = settings.whenFinish;

        this._videoControl = Game.$.byId('video-' + this.id);

        _manageCallback(this);

        return this;
    };

    function _manageCallback(self) {
        if (Game.Helpful.isFunction(self.whenFinish)) {
            self._videoControl.addEventListener('ended', function (e) {
                self.whenFinish();
                self.hide();
            });
        }
    }

    fn.prototype.play = function() {
        Logger.info('Play video...');
        this._videoControl.removeClass('hide');
        this._videoControl.play();
    };

    fn.prototype.stop = function() {
        Logger.info('Pause video...');
        this._videoControl.addClass('hide');
        this._videoControl.pause();
    };

    fn.prototype.hide = function() {
        this._videoControl.addClass('hide');
        Game.$.byId('videos').addClass('hide');
    };

    return fn;

}));
