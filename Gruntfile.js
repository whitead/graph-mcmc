'use strict';
module.exports = function (grunt) {
    
    //load required grunt plugins
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
       
	
	browserify: {
	    'build/app.js': ['client/scripts/**/*.js']

	},

	
	jshint: {
	    all: [
		'Gruntfile.js',
		'client/scripts/**/*.js'
	    ],
	    options: {
		jshintrc: '.jshintrc',
	    },
	},

        mochaTest: {
            test: {
                options: {
            reporter: 'spec'
                },
                src: ['client/test/**/*.js']
            }
        },
	
	watch: {
	    html:{
		files: ['client/**/*.html'],
		tasks: ['html']		
		
	    },
	    js: [
		files: ['client/scripts/**/*.js'],
		tasks: ['js']

	    }	    
	}

	
	grunt.registerTask('js', ['jshint', 'test', 'browserify']);
	grunt.registerTask('default', ['js', 'watch']);
    });

};
