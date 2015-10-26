'use strict';

/**
 * This task is responsible to concat all js files and put it in a bin direcotory.
 *
 * @author madureira
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
            // Removing module of configuration file to use the same on the browser.
            .pipe(plugins.replaceTask({
                usePrefix: false,
                patterns: [{
                    match: 'module.exports=function(){return Game;}();',
                    replacement: ''
                }]
            }))
            .pipe(plugins.concat(fileName))
            .pipe(gulp.dest(destinationFolder));
    };
};
