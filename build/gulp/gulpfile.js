'use strict';

/**
 * Responsible to define gulp tasks.
 *
 * @author madureira
 *
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({camelize: true});
var config = require('../../config/build');
var gameSettings = require('../../config/game');

// tasks
gulp.task('concatMainJs', require('./gulp-tasks/concat')(gulp, plugins, config.js.source, config.js.dest, 'main.js'));
gulp.task('concatJsVendors', require('./gulp-tasks/vendors')(gulp, plugins, config.js.vendors, config.js.dest, 'vendors.js'));
gulp.task('buildTemplates', require('./gulp-tasks/templates')(gulp, plugins, config.tmpl.source, config.js.dest, 'templates.js'));
gulp.task('buildCss', require('./gulp-tasks/less')(gulp, plugins, config.css.source, config.css.dest, 'style.css', gameSettings));
gulp.task('minifyCss', require('./gulp-tasks/minifycss')(gulp, plugins, 'style.css', config.css.dest, 'style.min.css'));
gulp.task('moveAssets', require('./gulp-tasks/assets')(gulp, plugins, config.assets.files, config.assets.dest));

// defaul task
gulp.task('default', [
    'concatMainJs',
    'concatJsVendors',
    'buildTemplates',
    'buildCss',
    'minifyCss',
    'moveAssets'
]);

// Watch file's modification and run tasks
gulp.task('watch', function() {
    gulp.start('default');
    gulp.watch(config.js.source, ['concatMainJs']);
    gulp.watch(config.js.vendors, ['concatJsVendors']);
    gulp.watch(config.tmpl.source, ['buildTemplates']);
    gulp.watch(config.css.source, ['buildCss']);
    gulp.watch(config.css.source, ['minifyCss']);
    gulp.watch(config.assets.files, ['moveAssets']);
});
