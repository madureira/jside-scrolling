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

    /**
     * Put the video on the HTML.
     *
     * @param {JSON} video
     *
     * @return void
     *
     */
    fn  = function(video) {

        var videoTemplate = Game.templates.video_markup(video);
        var autoplay = video.autoPlay;

        var $videos = Game.$.byId('videos');

        $videos.insertAdjacentHTML('beforeend', videoTemplate);

        this._videoControl = Game.$.byId('video-' + video.id);

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
