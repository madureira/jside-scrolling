'use strict';

/**
 * This task is responsible to concat all js files and put it in a bin direcotory.
 *
 * @param gulp Gulp stream
 * @param plugins All gulp plugins
 * @param sourceFiles All paths to source files to build
 * @param destinationFolder Where to put the bin files
 *
 * @return task
 *
 */
module.exports = function (gulp, plugins, sourceFiles, destinationFolder) {
    var FILE_NAME = 'main.js';

    return function() {
        gulp.src(sourceFiles)
            .pipe(plugins.concat(FILE_NAME))
            .pipe(gulp.dest(destinationFolder));
    };

};
