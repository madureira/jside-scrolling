'use strict';

/**
 * This task is responsible to build all templates files and put it in a bin direcotory.
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
            .pipe(plugins.handlebars())
            .pipe(plugins.defineModule('plain', {
                wrapper: 'Game.templates["<%= templateName %>"] = <%= handlebars %>',
                context: function(context) {
                    var file = context.file;
                    var fullPath = file.path.replace(/\\/g,'/');
                    var tplPath = fullPath.split("templates/ui/").pop();
                    var name = tplPath.replace(new RegExp('/', 'g'), '_').replace('.js', '');

                    return { templateName: name };
                }
            }))
            .pipe(plugins.concat(fileName))
            //.pipe(plugins.uglify())
            .pipe(gulp.dest(destinationFolder))
            .pipe(plugins.filesize())
            .on('error', plugins.util.log);
    }
};
