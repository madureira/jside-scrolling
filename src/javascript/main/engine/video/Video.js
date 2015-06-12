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

        var videoUi = new VideoUI({
            id: this.id,
            videoPath: this.videoPath,
            width: Game.settings.viewport.width,
            height: Game.settings.viewport.height,
            autoplay: this.autoplay
        });

        this._videoControl = videoUi;

        return this;
    };

    fn.prototype.play = function() {
        this._videoControl.play();
    };

    fn.prototype.stop = function() {
        this._videoControl.stop();
    };


    return fn;

}));
