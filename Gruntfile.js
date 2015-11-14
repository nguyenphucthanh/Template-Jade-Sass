module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'source/views/',
          src: ['*.jade'],
          dest: 'public/',
          ext: '.html'
        }]
      }
    },
    sass: {
      build: {
        options: {
          compress: false
        },
        files: [{
          'public/css/style.css': 'source/assets/css/style.scss'
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          'public/js/modernizr.js': 'source/assets/js/libs/modernizr-2.7.1.js',
          'public/js/libs.js': ['source/assets/js/libs/jquery-1.11.1.js', 'source/assets/js/libs/plugins/*.js'],
          'public/js/l10n.js': 'source/assets/js/l10n.js',
          'public/js/script.js': ['source/assets/js/settings.js', 'source/assets/js/plugins/*.js']
        }]
      }
    },
    copy: {
      ajax: {
        files: [{
          expand: true,
          cwd: 'source/views/ajax/',
          src: '**/*',
          dest: 'public/ajax/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'source/assets/images/',
          src: '**/*',
          dest: 'public/images/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: 'source/assets/icons/',
          src: '**/*',
          dest: 'public/'
        }]
      },
      videos: {
        files: [{
          expand: true,
          cwd: 'source/assets/videos/',
          src: '**/*',
          dest: 'public/videos/'
        }]
      },
      xml: {
        files: [{
          expand: true,
          cwd: 'source/assets/xml/',
          src: '**/*',
          dest: 'public/xml/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'source/assets/fonts/',
          src: '**/*',
          dest: 'public/fonts/'
        }]
      },
      swf: {
        files: [{
          expand: true,
          cwd: 'source/assets/swf/',
          src: '**/*',
          dest: 'public/swf/'
        }]
      }
    },
    jshint: {
      options: {
        devel: false,
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          Modernizr: true,
          jQuery: true,
          $: true,
          console: true
        }
      },
      files: ['package.json', 'Gruntfile.js', 'source/assets/js/plugins/*.js', 'source/assets/js/*.js']
    },
    csslint: {
      options: {
        'important': true,
        'adjoining-classes': true,
        'known-properties': true,
        'box-sizing': false,
        'box-model': false,
        'overqualified-elements': true,
        'display-property-grouping': true,
        'bulletproof-font-face': true,
        'compatible-vendor-prefixes': false,
        'regex-selectors': true,
        'errors': true,
        'duplicate-background-images': false,
        'duplicate-properties': true,
        'empty-rules': true,
        'selector-max-approaching': true,
        'gradients': true,
        'fallback-colors': true,
        'font-sizes': false,
        'font-faces': true,
        'floats': false,
        'star-property-hack': false,
        'outline-none': false,
        'import': true,
        'ids': false,
        'underscore-property-hack': true,
        'rules-count': true,
        'qualified-headings': false,
        'selector-max': true,
        'shorthand': true,
        'text-indent': true,
        'unique-headings': false,
        'universal-selector': true,
        'unqualified-attributes': true,
        'vendor-prefix': false,
        'zero-units': true
      },
      files: ['public/css/*.css']
    },
    htmlhint: {
      options: {
        'tagname-lowercase': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'spec-char-escape': true,
        'id-unique': true,
        'src-not-empty': true,
        'img-alt-require': true
      },
      files: ['public/*.html']
    },
    watch: {
      options: {
        //livereload: true
        spawn: false
      },
      scripts: {
        options: {
          spawn: false
        },
        files: ['package.json', 'Gruntfile.js', 'source/server.js', 'source/routes.js'],
        tasks: ['jshint']
      },
      js: {
        files: ['source/assets/js/plugins/*.js', 'source/assets/js/*.js'],
        tasks: ['jshint', 'concat']
      },
      jade: {
        files: ['source/views/**/*.jade'],
        tasks: ['jade', 'htmlhint']
      },
      ajax: {
        files: ['source/views/ajax/**/*.*'],
        tasks: ['copy:ajax']
      },
      sass: {
        files: ['source/assets/css/**/*.scss'],
        tasks: ['sass', 'csslint']
      },
      fonts: {
        files: ['source/assets/fonts/**/*'],
        tasks: ['copy:fonts']
      },
      images: {
        files: ['source/assets/images/**/*'],
        tasks: ['copy:images']
      },
      videos: {
        files: ['source/assets/videos/**/*'],
        tasks: ['copy:videos']
      },
      xml: {
        files: ['source/assets/xml/**/*'],
        tasks: ['copy:xml']
      },
      swf: {
        files: ['source/assets/swf/**/*'],
        tasks: ['copy:swf']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'public/images/',
          src: '**/*',
          dest: 'public/images/'
        }]
      }
    },
    cssmin: {
      compress: {
        files: [{
          'public/css/style.css': 'public/css/style.css'
        }]
      }
    },
    usemin: {
      html: ['public/**/*.html'],
      css: ['public/**/*.css']
    },
    uglify: {
      options: {
        compress: true,
        beautify: false,
        preserveComments: false
      },
      dist: {
        files: [{
          'public/js/modernizr.js': 'source/assets/js/libs/modernizr-2.7.1.js',
          'public/js/libs.js': ['source/assets/js/libs/jquery-1.11.1.js', 'source/assets/js/libs/plugins/*.js'],
          'public/js/l10n.js': 'source/assets/js/l10n.js',
          'public/js/script.js': ['source/assets/js/settings.js', 'source/assets/js/plugins/*.js']
        }]
      }
    },
    accessibility: {
      options: {
        accessibilityLevel: 'WCAG2A'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['*.html'],
          dest: 'reports/',
          ext: '-report.txt'
        }]
      }
    },
    plato: {
      options: {
        jshint: grunt.file.readJSON('.jshintrc')
      },
      local: {
        files: {
          'reports': ['source/**/*.js']
        }
      }
    },
    qunit: {
      options: {
        timeout: 10000,
        '--cookies-file': 'test/cookies.txt'
      },
      all: {
        options: {
          urls: [
            'http://localhost:8000/test/test.html'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    clean: {
      build: ['public']
    },
    browserSync: {
      bsFiles: {
        src: [
          'public/**/*'
        ]
      },
      options: {
        server: 'public/',
        watchTask: true,
        online: true
      }
    }
  });

  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  grunt.registerTask('default', ['clean', 'concat', 'sass', 'jade', 'copy', 'htmlhint', 'jshint', 'csslint', 'browserSync', 'watch']);
  grunt.registerTask('build', ['default']);
  grunt.registerTask('test', ['connect:server', 'qunit']);
  grunt.registerTask('wai', ['accessibility']);
  grunt.registerTask('report', ['plato:local']);
  grunt.registerTask('release', ['build', 'test', 'imagemin', 'uglify', 'cssmin', 'usemin']);
};
