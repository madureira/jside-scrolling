module.exports = function(config) {
    config.set({
        basePath: '../../..',
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

        colors: true,
        port: 9876,

        files: [
            {
                pattern: 'src/assets/**/*.png',
                watched: false,
                included: false,
                served: true
            },
            'bin/js/vendors.js',
            'bin/js/main.js',
            'bin/js/templates.js',
            'src/javascript/test/**/*.test.js'
        ],

        proxies: {
            '/src/assets/': '/base/src/assets/'
        },

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        singleRun: true
    });
};
