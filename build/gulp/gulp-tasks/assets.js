'use strict';

/**
 * This task is responsible to move assets to  bin direcotory.
 *
 * @author madureira
 *
 * @param gulp Object
 * @param plugins Object
 * @param sourceFiles Array/String
 * @param destinationFolder String
 *
 * @return task
 *
 */
module.exports = function (gulp, plugins, sourceFiles, destinationFolder) {
    return function() {
        gulp.src(sourceFiles)
            .pipe(gulp.dest(destinationFolder));
    };
};
