module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            build: {
                src: ['src/index.js', 'src/login.js'],
                dest: 'build/bundle.js'
            }
        },
        uglify: {
            build: {
                src: ['build/bundle.js'],
                dest: 'build/bundle.min.js'
            }
        },
        eslint: {
            options: {
                configFile: '.eslintrc.json',
            },
            target: ['src/index.js', 'src/login.js']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('default', ['concat', 'uglify']);

};
