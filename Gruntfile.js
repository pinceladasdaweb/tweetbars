module.exports = function (grunt) {
    "use strict";

    var pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
        meta: {
          banner: '/*! '+pkg.name+' '+pkg.version+' | (c) 2014 '+pkg.author+' | '+pkg.licenses[0].type+' License */'
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
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
