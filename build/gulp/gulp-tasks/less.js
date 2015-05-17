'use strict';

/**
 * This task is responsible to concat all less files and put it in a bin direcotory.
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
            .pipe(plugins.less())
            .pipe(gulp.dest(destinationFolder))
            .pipe(plugins.filesize())
            .pipe(plugins.minifyCss())
            .pipe(plugins.rename(fileName.split('.')[0] + '.min.css'))
            .pipe(gulp.dest(destinationFolder))
            .pipe(plugins.filesize())
            .on('error', plugins.util.log);
    };
};
