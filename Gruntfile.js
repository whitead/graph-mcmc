'use strict';

module.exports = function (grunt) {
    
    //load required grunt plugins
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
	
        pkg: grunt.file.readJSON('package.json'),
       	
	browserify: {
	    options: {
		transform: [
		    ['babelify', {
			loose: 'all'
		    }]
		],
		browserifyOptions: {
		    debug: true
		}
	    },
	    files:{		
		'build/app.js': ['client/scripts/**/*.js']
	    }
	},

	uglify: {
	    files: {
		'build/min.js': ['build/app.js']
	    }
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
	    js: {
		files: ['client/scripts/**/*.js'],
		tasks: ['js']
		
	    }	    
	}
	
    });
    

    grunt.registerTask('js', ['jshint', 'mochaTest', 'browserify']);
    grunt.registerTask('default', ['js', 'watch']);
    grunt.registerTask('production', ['js', 'uglify']);
        
};
