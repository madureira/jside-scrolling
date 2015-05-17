Game.define('Boot', 'engine/boot', (function(fn, undefined) {
    'use strict';

    fn.prototype.init = function() {
        console.log('Booting...');
    };

    return fn;

}));
