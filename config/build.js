'use strict';

/**
 * This is the build configuration file.
 * Here is defined how the jside-scrolling will distribute the files and where.
 * The load order of files should be taken into account, pay attention about it.
 *
 * @author madureira
 */

var BASE_DIR = '../../';

var Config      = {};
Config.js       = {};
Config.css      = {};
Config.assets   = {};
Config.tmpl     = {};


Config.js.dest      = BASE_DIR + 'public/bin/js/';
Config.css.dest     = BASE_DIR + 'public/bin/css/';
Config.assets.dest  = BASE_DIR + 'public/bin/';


Config.js.source = [
    BASE_DIR + 'config/game.js',
    BASE_DIR + 'src/javascript/main/core/util/**/*.js',
    BASE_DIR + 'src/javascript/main/core/package/Manager.js',
    BASE_DIR + 'src/javascript/main/engine/**/*.js',
    BASE_DIR + 'src/javascript/main/start.js'
];

Config.js.vendors = [
    BASE_DIR + 'src/javascript/vendors/**/*.js'
];

Config.css.source = [
    BASE_DIR + 'src/stylesheet/vendors/**/*.css',
    BASE_DIR + 'src/stylesheet/settings.less',
    BASE_DIR + 'src/stylesheet/ui/**/*.less'
];

Config.assets.files = [
    BASE_DIR + 'src/assets/**/*.png',
    BASE_DIR + 'src/assets/**/*.jpg',
    BASE_DIR + 'src/assets/**/*.gif',
    BASE_DIR + 'src/assets/**/*.mp3',
    BASE_DIR + 'src/assets/**/*.ogg',
    BASE_DIR + 'src/assets/**/*.mp4'
];

Config.tmpl.source = [
    BASE_DIR + 'src/templates/ui/**/*.tmpl'
];


module.exports = function() {
    return Config;
}();
