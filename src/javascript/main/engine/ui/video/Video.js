/**
 * Responsible to build the markup to video.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Video', 'engine/ui/video', (function(fn, undefined) {
    'use strict';

    var VIDEO_WIDTH = Game.settings.viewport.width,
        VIDEO_HIGHT = Game.settings.viewport.height;

    /**
     * Put the video on the HTML.
     *
     * @param {JSON} video
     *
     * @return void
     *
     */
    fn  = function(options) {
        options.width = VIDEO_WIDTH;
        options.height = VIDEO_HIGHT;

        var videoTemplate = Game.templates.video_markup(options);

        var $videos = Game.$.byId('videos');

        $videos.insertAdjacentHTML('beforeend', videoTemplate);

        this._videoControl = Game.$.byId('video-' + options.id);
        this._videoControl.load();

        var evt = document.createEvent('Event');
        evt.initEvent('onload', true, true);

        var self = this;
        this.observer = setTimeout(function() {
            if (self._videoControl.readyState === 4) {
                self._videoControl.dispatchEvent(evt);
                clearTimeout(self.observer);
            }
        }, 500);

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
