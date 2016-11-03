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
			'presets': ['es2015'] 
		    }]
		],
		browserifyOptions: {
		    debug: true
		}
	    },
	    'build/app.js': ['client/scripts/main.js']
	},

	uglify: {
	    foo: {
		files: {
		    'build/app.min.js': ['build/app.js']
		}
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
		files: ['client/**/*.js'],
		tasks: ['js']
		
	    }	    
	},

	copy: {
	    html: {
		cwd: 'client',
		src: ['**/*.html'],
		dest: 'build',
		expand: true		
	    }
	},
	
	shell: {
            target: {
		command: 'scp build/app.min.js andrewwh@andrew-white.com:~/public_html/white_lab/Apps/GraphMC/'
            }
	},


	//host the code
	connect: {
	    server: {
		options: {
		    port: 4000,
		    base: 'build',
		    livereload: true
		}
	    }
	}
	
	
    });
    

    grunt.registerTask('js', ['jshint', 'mochaTest', 'browserify']);
    grunt.registerTask('html', ['copy:html']);
    grunt.registerTask('default', ['js', 'html', 'connect', 'watch']);
    grunt.registerTask('production', ['js', 'uglify', 'html', 'shell']);
        
};
