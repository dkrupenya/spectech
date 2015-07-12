// Gruntfile.js
module.exports = function(grunt) {
    'use strict';
    // Task configuration will go here
    grunt.initConfig({
        includereplace: {
            your_target: {
                options: {
                    // Task-specific options go here.
                },
                // Files to perform replacements and includes with
                src: 'src/*.html',
                // Destination directory to copy files to
                dest: '../'
            }
        }
    });

    grunt.loadNpmTasks('grunt-include-replace');

};
