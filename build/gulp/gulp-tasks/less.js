'use strict';

/**
 * This task is responsible to concat all less files and put it in a bin direcotory.
 *
 * @author madureira
 *
 * @param gulp Object
 * @param plugins Object
 * @param sourceFiles Array/String
 * @param destinationFolder String
 * @param fileName String
 * @param gameSettings Object
 *
 * @return task
 *
 */
module.exports = function (gulp, plugins, sourceFiles, destinationFolder, fileName, gameSettings) {
    return function() {
        var settingsList = getConfigs(gameSettings);

        gulp.src(sourceFiles)
            .pipe(plugins.replaceTask({
                usePrefix: false,
                patterns: settingsList
            }))
            .pipe(plugins.concat(fileName))
            .pipe(plugins.less())
            .pipe(gulp.dest(destinationFolder))
            .pipe(plugins.filesize())
            .on('error', plugins.util.log);
    };
};

function getConfigs(gameSettings) {
    var list = [];
    var Stylesheet;

    if (gameSettings.stylesheet !== undefined) {
        Stylesheet = gameSettings.stylesheet;
        var keys = Object.keys(Stylesheet);
        var i = 0;
        var size = keys.length;

        for (i; i < size; i++) {
            var key = keys[i];
            var value = Stylesheet[keys[i]];

            key = '{{'+key+'}}';

            var pattern = {
                match: key,
                replacement: value
            };

            list.push(pattern);
        }
    }

    return list;
}
