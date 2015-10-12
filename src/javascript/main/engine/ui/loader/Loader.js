/**
 * Responsible to build the markup to loader.
 *
 * @author madureira
 *
 * @param fn context
 * @param undefined undefined
 *
 */
Game.define('Loader', 'engine/ui/loader', (function(fn, undefined) {
    'use strict';

    /**
     * Put the loader on the HTML.
     *
     * @return void
     *
     */
    fn  = function() {
        this.$loader = Game.$.byId('loader');
        return this;
    };

    fn.prototype.on = function() {
        this.$loader.addClass('on');
    };

    fn.prototype.off = function() {
        this.this.$loader.removeClass('on');
    };

    return fn;

}));
