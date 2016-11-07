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

	mocha_istanbul: {
            coveralls: {
                src: ['client/test'], // multiple folders also works
                options: {
                    coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
                    check: {
                        lines: 75,
                        statements: 75
                    },
                    root: 'client/lib'
                }
            }
        },
	
        istanbul_check_coverage: {
            default: {
		options: {
		    coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
		    check: {
			lines: 80,
			statements: 80
		    }
		}
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

	coveralls :{
	        // Options relevant to all targets
	    options: {
		// When true, grunt-coveralls will only print a warning rather than
		// an error, to prevent CI builds from failing unnecessarily (e.g. if
		// coveralls.io is down). Optional, defaults to false.
		force: false
	    },
	    
	    lib: {
		// LCOV coverage file (can be string, glob or array)
		src: 'coverage/lcov.info',
		options: {
		    // Any options for just this target
		}
	    },
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
    

    grunt.event.on('coverage', function(lcovFileContents, done){
        // Check below on the section "The coverage event"
        done();
    });
    
    grunt.registerTask('coverage', ['mocha_istanbul:coveralls', 'coveralls:lib']);
    
    grunt.registerTask('js', ['jshint', 'mochaTest', 'coverage', 'browserify']);
    grunt.registerTask('html', ['copy:html']);
    grunt.registerTask('default', ['js', 'html', 'connect', 'watch']);
    grunt.registerTask('production', ['js', 'uglify', 'html', 'shell']);
        
};
