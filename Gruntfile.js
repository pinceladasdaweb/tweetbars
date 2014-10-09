module.exports = function (grunt) {
    pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        uglify: {
            options: {
                banner: '/* Minified JavaScript of Tweetbars version:2.0.0 */\n'
            },
            target: {
                files: {
                    'src/tweets.min.js': ['src/helpers.js', 'src/tweets.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'uglify' ]);
};
