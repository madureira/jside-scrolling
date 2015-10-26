'use strict';

/**
 * This task is responsible to minify css file.
 *
 * @author madureira
 *
 * @param gulp Object
 * @param plugins Object
 * @param sourceFile String
 * @param destinationFolder String
 * @param fileName String
 *
 * @return task
 *
 */
module.exports = function (gulp, plugins, sourceFile, destinationFolder, fileName) {
    return function() {
        gulp.src(destinationFolder + sourceFile)
            .pipe(plugins.minifyCss())
            .pipe(plugins.rename(fileName.split('.')[0] + '.min.css'))
            .pipe(gulp.dest(destinationFolder))
            .pipe(plugins.filesize())
            .on('error', plugins.util.log);
    };
};
