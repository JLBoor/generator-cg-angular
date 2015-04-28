/*jslint node: true */
'use strict';

var pkg = require('./package.json');
var _ = require('./package.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function(fileTypePatterns) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules','bower_components','dist','temp'];
    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function(file){
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 ||
                !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function(pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function(patterns){
            return patterns;
        })
        .concat(fileTypePatterns);
};

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        connect: {
            main: {
                options: {
                    port: 9001,
                    host: 'localhost',
                    base: '',
                    middleware: function (connect, options) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            // Include the proxy first
                            proxy,
                            // Serve static files.
                            connect.static(options.base),
                            // Make empty directories browsable.
                            connect.directory(options.base)
                        ];
                    }
                },
                proxies: [
                    {
                        context: '/rest',
                        host: 'localhost',
                        port: 9002,
                        https: false,
                        forward: false,
                        rewrite: {
                            '^/rest': '/'
                        }
                    }
                ]
            }
        },
        watch: {
            main: {
                options: {
                    //livereload: true,
                    //livereloadOnError: false,
                    spawn: false
                },
                files: [createFolderGlobs(['app/**/*.js','app/**/*.html']),'!_SpecRunner.html','!.grunt'],
                tasks: [
                    'jshint:main',
                    'dom_munger:read',
                    'karma:during_watch'
                ]
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: createFolderGlobs('app/**/*.js')
            }
        },
        clean: {
            before:{
                src:['dist','temp']
            },
            after: {
                src:['temp']
            }
        },
        less: {
            production: {
                options: {
                    paths: ["app/less/"],
                    modifyVars: {
                        "fa-font-path": "'fonts/font-awesome/'",
                        "icon-font-path": "'fonts/bootstrap/'"
                    }
                },
                files: {
                    "temp/app.css": "app/less/app.less"
                }
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: pkg.name,
                    htmlmin:'<%= htmlmin.main.options %>'
                },
                cwd: 'app',
                src: ['**/*.html','!index.html','!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['img/**'], dest: 'dist/'},
                    {cwd: 'app/', src: ['i18n/**'], dest: 'dist/', filter: 'isFile', expand: true},
                    {cwd: 'bower_components/font-awesome/fonts/', src: ['**'], dest: 'dist/fonts/font-awesome',filter:'isFile',expand:true},
                    {cwd: 'bower_components/bootstrap/fonts/', src: ['**'], dest: 'dist/fonts/bootstrap',filter:'isFile',expand:true}
                ]
            }
        },
        dom_munger:{
            read: {
                options: {
                    read:[
                        {selector:'script[data-concat!="false"]',attribute:'src',writeto:'appjs',isPath:true},
                        {selector:'link[rel="stylesheet"][data-concat!="false"]',attribute:'href',writeto:'appcss',isPath:true}
                    ]
                },
                src: 'app/index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]','link[data-remove!="false"]'],
                    append: [
                        {selector:'body',html:'<script src="app.full.min.js"></script>'},
                        {selector:'head',html:'<link rel="stylesheet" href="app.full.min.css">'}
                    ]
                },
                src:'app/index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin: {
            main: {
                src:['temp/app.css'],
                dest:'dist/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.appjs %>','<%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        ngAnnotate: {
            main: {
                src:'temp/app.full.js',
                dest: 'temp/app.full.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest:'dist/app.full.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        karma: {
            options: {
                frameworks: ['jasmine'],
                files: [  //this files data is also updated in the watch handler, if updated change there too
                    '<%= dom_munger.data.appjs %>',
                    'bower_components/angular-mocks/angular-mocks.js',
                    createFolderGlobs('*.spec.js')
                ],
                logLevel: 'ERROR',
                autoWatch: false, //watching is handled by grunt-contrib-watch
                singleRun: true
            },
            all_tests: {
                reporters:['mocha'],
                browsers: ['PhantomJS','Chrome','Firefox']
            },
            during_watch: {
                reporters:['mocha'],
                browsers: ['PhantomJS']
            },
            unit_and_coverage: {
                browsers: ['PhantomJS'],
                reporters:['mocha', 'coverage'],
                preprocessors: {
                    'app/**/!(_test)/*.js': ['coverage']
                },

                coverageReporter: {
                    type: 'lcovonly',
                    dir: 'target/karma-reports/',
                    reporters: [
                        {type: 'lcovonly', subdir: '.', file: 'lcov.info'},
                    ]
                }
            }
        },

        json_server: {
            data: {
                options: {
                    port: 9002,
                    hostname: 'localhost',
                    db: 'data/db.json'
                }
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: {
                tasks: [
                    'json_server',
                    'serve'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask('build',['jshint','clean:before','less:production', 'dom_munger', 'cssmin', 'ngtemplates','concat','ngAnnotate','uglify','copy','htmlmin','clean:after']);
    grunt.registerTask('serve', ['dom_munger:read','jshint', 'configureProxies:main', 'connect:main', 'watch']);
    grunt.registerTask('test',['jshint', 'dom_munger:read','karma:all_tests']);

    grunt.registerTask('travis',['jshint', 'dom_munger:read','karma:unit_and_coverage']);
    grunt.registerTask('sample',['concurrent:server']);

    grunt.event.on('watch', function(action, filepath) {

        var _getSpecFile = function(filepath) {
            var directoryLastIndex = filepath.lastIndexOf('/');
            var specFile = [
                filepath.slice(0, directoryLastIndex),
                '/_tests',
                filepath.slice(directoryLastIndex,
                filepath.length-3), '.spec.js'
            ].join('');

            return grunt.file.exists(specFile) ? specFile : null;
        };


        var _setKarmaFile = function(filepath) {
            var files = [].concat(grunt.config('dom_munger.data.appjs'));
            files.push('bower_components/angular-mocks/angular-mocks.js');
            if(filepath) { files.push(filepath); }
            grunt.config('karma.options.files', files);
        };


        if (filepath.lastIndexOf('.js') !== -1) {

            if (filepath.lastIndexOf('.spec.js') !== -1) { _setKarmaFile(filepath); }  // If changing an unit test, then execute it.
            else {
                // If not changing an unit test,
                // then execute find the corresponding unit test and run it.
                var specPath = _getSpecFile(filepath);
                if(specPath) { _setKarmaFile(specPath); }
                else {
                    grunt.log.error('No tests found for ' + filepath);
                    _setKarmaFile();
                }
            }
            // JSHint on the modified file
            grunt.config('jshint.main.src', filepath);
        } else {
            grunt.config('jshint.main.src', []);
            grunt.config('karma.options.files', []);
        }

    });
};
