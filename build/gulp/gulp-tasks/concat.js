'use strict';

/**
 * This task is responsible to concat all js files and put it in a bin direcotory.
 *
 * @param gulp Object
 * @param plugins Object
 * @param sourceFiles Array/String
 * @param destinationFolder String
 * @param fileName String
 *
 * @return task
 *
 */
module.exports = function (gulp, plugins, sourceFiles, destinationFolder, fileName) {
    return function() {
        gulp.src(sourceFiles)
            .pipe(plugins.concat(fileName))
            .pipe(gulp.dest(destinationFolder));
    };
};
