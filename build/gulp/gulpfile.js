'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var BASE_DIR = '../../',
    JS_DEST_DIR = BASE_DIR + 'bin/js/',
    CSS_DEST_DIR = BASE_DIR + 'bin/css/',
    ASSETS_DEST_DIR = BASE_DIR + 'bin/',
    JS_START_FILES = [ BASE_DIR + 'src/javascript/main/start.js' ],
    TEMPLATES_FILES = [ BASE_DIR + 'src/templates/ui/**/*.tmpl' ],
    JS_VENDORS_FILES = [ BASE_DIR + 'src/javascript/vendors/**/*.js' ],
    JS_SOURCE_FILES = [
        BASE_DIR + 'src/javascript/main/core/config/Properties.js',
        BASE_DIR + 'src/javascript/main/core/util/**/*.js',
        BASE_DIR + 'src/javascript/main/core/package/Manager.js',
        BASE_DIR + 'src/javascript/main/engine/**/*.js'
    ],
    CSS_SOURCE_FILES = [
        BASE_DIR + 'src/stylesheet/vendors/rest.less',
        BASE_DIR + 'src/stylesheet/vendors/**/*.less',
        BASE_DIR + 'src/stylesheet/ui/main.less',
        BASE_DIR + 'src/stylesheet/ui/**/*.less'
    ],
    ASSETS_FILES = [
        BASE_DIR + 'src/assets/**/*.png',
        BASE_DIR + 'src/assets/**/*.jpg',
        BASE_DIR + 'src/assets/**/*.gif',
        BASE_DIR + 'src/assets/**/*.mp3',
        BASE_DIR + 'src/assets/**/*.ogg',
        BASE_DIR + 'src/assets/**/*.mp4'
    ];


// tasks
gulp.task('concatMainJs', require('./gulp-tasks/concat')(gulp, plugins, JS_SOURCE_FILES, JS_DEST_DIR, 'main.js'));
gulp.task('concatStartJs', require('./gulp-tasks/concat')(gulp, plugins, JS_START_FILES, JS_DEST_DIR, 'start.js'));
gulp.task('concatJsVendors', require('./gulp-tasks/vendors')(gulp, plugins, JS_VENDORS_FILES, JS_DEST_DIR, 'vendors.js'));
gulp.task('buildTemplates', require('./gulp-tasks/templates')(gulp, plugins, TEMPLATES_FILES, JS_DEST_DIR, 'templates.js'));
gulp.task('buildCss', require('./gulp-tasks/less')(gulp, plugins, CSS_SOURCE_FILES, CSS_DEST_DIR, 'style.css'));
gulp.task('moveAssets', require('./gulp-tasks/assets')(gulp, plugins, ASSETS_FILES, ASSETS_DEST_DIR));


// defaul task
gulp.task('default', [
    'concatMainJs',
    'concatStartJs',
    'concatJsVendors',
    'buildTemplates',
    'buildCss',
    'moveAssets'
]);


// Watch file modifications and run tasks
gulp.task('watch', function() {
    gulp.start('default');
    gulp.watch(JS_SOURCE_FILES, ['concatMainJs']);
    gulp.watch(JS_START_FILES, ['concatStartJs']);
    gulp.watch(JS_VENDORS_FILES, ['concatStartJs']);
    gulp.watch(TEMPLATES_FILES, ['buildTemplates']);
    gulp.watch(CSS_SOURCE_FILES, ['buildCss']);
    gulp.watch(ASSETS_FILES, ['moveAssets']);
});

