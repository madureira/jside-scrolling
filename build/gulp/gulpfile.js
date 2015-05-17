'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var BASE_DIR = '../../',
    JS_DEST_DIR = BASE_DIR + 'bin/js/',
    JS_SOURCE_FILES = [
        BASE_DIR + 'src/javascript/main/core/config/Properties.js',
        BASE_DIR + 'src/javascript/main/core/util/Helpful.js',
        BASE_DIR + 'src/javascript/main/core/package/Manager.js',
        BASE_DIR + 'src/javascript/main/**/*.js'
    ];


// tasks
gulp.task('concat', require('./gulp-tasks/concat')(gulp, plugins, JS_SOURCE_FILES, JS_DEST_DIR));


// defaul task
gulp.task('default', [
    'concat'
]);


// Watch file modifications and run tasks
gulp.task('watch', function() {
    gulp.watch(JS_SOURCE_FILES, ['concat']);
});

