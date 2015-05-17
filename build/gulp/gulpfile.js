'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var BASE_DIR = '../../',
    JS_DEST_DIR = BASE_DIR + 'bin/js/',
    CSS_DEST_DIR = BASE_DIR + 'bin/css/',
    JS_START_FILES = [ BASE_DIR + 'src/javascript/main/start.js' ],
    TEMPLATES_FILES = [ BASE_DIR + 'src/templates/ui/**/*.tmpl' ],
    JS_VENDORS_FILES = [ BASE_DIR + 'src/javascript/vendors/**/*.js' ],
    JS_SOURCE_FILES = [
        BASE_DIR + 'src/javascript/main/core/config/Properties.js',
        BASE_DIR + 'src/javascript/main/core/util/Helpful.js',
        BASE_DIR + 'src/javascript/main/core/package/Manager.js',
        BASE_DIR + 'src/javascript/main/engine/**/*.js'
    ],
    CSS_SOURCE_FILES = [
        BASE_DIR + 'src/stylesheet/vendors/rest.less',
        BASE_DIR + 'src/stylesheet/vendors/**/*.less',
        BASE_DIR + 'src/stylesheet/ui/**/*.less'
    ];


// tasks
gulp.task('concatMainJs', require('./gulp-tasks/concat')(gulp, plugins, JS_SOURCE_FILES, JS_DEST_DIR, 'main.js'));
gulp.task('concatStartJs', require('./gulp-tasks/concat')(gulp, plugins, JS_START_FILES, JS_DEST_DIR, 'start.js'));
gulp.task('concatJsVendors', require('./gulp-tasks/vendors')(gulp, plugins, JS_VENDORS_FILES, JS_DEST_DIR, 'vendors.js'));
gulp.task('buildTemplates', require('./gulp-tasks/templates')(gulp, plugins, TEMPLATES_FILES, JS_DEST_DIR, 'templates.js'));
gulp.task('buildCss', require('./gulp-tasks/less')(gulp, plugins, CSS_SOURCE_FILES, CSS_DEST_DIR, 'style.css'));


// defaul task
gulp.task('default', [
    'concatMainJs',
    'concatStartJs',
    'concatJsVendors',
    'buildTemplates',
    'buildCss'
]);


// Watch file modifications and run tasks
gulp.task('watch', function() {
    gulp.watch(JS_SOURCE_FILES, ['concatMainJs']);
    gulp.watch(JS_START_FILES, ['concatStartJs']);
    gulp.watch(JS_VENDORS_FILES, ['concatStartJs']);
    gulp.watch(TEMPLATES_FILES, ['buildTemplates']);
    gulp.watch(CSS_SOURCE_FILES, ['buildCss']);
});

