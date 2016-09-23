module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //=======================================
    // JS
    //=======================================
    //Minify JS
    uglify: {
      options: {
        mangle: false,
      },
      my_target: {
        files: {
          'www/js/main.js': ['www/js/main.js'],
        },
      },
    },
    browserify: {
      dist: {
        options: {
          transform: [['babelify', {presets: ['es2015']}]]
        },
        src: ['source/js/main.js'],
        dest: 'www/js/main.js',
      },
    },
    //=======================================
    // CSS
    //=======================================
    sass_globbing: {
      build: {
        files: {
          'source/css/sass/_helpersMap.scss': 'source/css/sass/helpers/*.scss',
          'source/css/sass/_baseMap.scss':    'source/css/sass/base/*.scss',
          'source/css/sass/_layoutMap.scss':  'source/css/sass/layout/*.scss',
        }
      }
    },

    sass: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          'source/css/style.css': 'source/css/sass/style.scss'
        },
      },
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}),
        ],
      },
      dist: {
        src: 'source/css/style.css',
        dest: 'source/css/style.css',
      },
    },

    concat: {
      dist: {
        files: {
          'www/css/style.css' : [
            'source/css/vendor/fonts.css',
            'source/css/vendor/bootstrap.css',
            'source/css/style.css',
          ],
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'www/css/',
          src: ['*.css'],
          dest: 'www/css/',
          ext: '.min.css',
        }],
      },
    },
    //=======================================
    // CACHE BUST
    //=======================================
    cacheBust: {
      build: {
        options: {
          baseDir: './www/',
          assets: ['js/**/*.js', 'css/**/*.css', 'img/**/*.png', 'img/**/*.gif', 'img/**/*.jpg', 'img/**/*.svg'],
          deleteOriginals: true,
        },
        files: [{
          expand: true,
          cwd: 'www/',
          src: ['**/*.js', '**/*.css', '**/*.html', '**/*.json'],
        }],
      },
    },
    //=======================================
    // COPY
    //=======================================
    copy: {
      // We only need to copy images during dev since MM will handle that during a production build.
      images: {
        files: [{
          expand: true,
          cwd: 'source/img',
          src: ['**'],
          dest: 'www/img',
        }],
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'source/fonts',
          src: ['**'],
          dest: 'www/fonts',
        }],
      }
    },
    //=======================================
    // WATCH
    //=======================================
    watch: {
      browserify: {
        files: ['source/js/*.js'],
        tasks: ['browserify']
      },
      styles: {
        files: ['source/css/**/*.scss'],
        tasks: ['sass_globbing', 'sass', 'postcss', 'concat', 'cssmin'],
      },
      images: {
        files: ['source/img/**'],
        tasks: ['copy:images'],
      },
      configFiles: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true,
        },
      },
    },
    //=======================================
    // BROWSERSYNC
    //=======================================
    // NOTE:
    // Durning dev we have the MiddleMan server running on :4567.
    // We also have a node server running on :5678 to serve assets like images, css and js.
    // Then we have BrowserSync running on :6789 to inject css/js changes into the browser.
    // These are not used durning the production build process.
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'www/css/*.css',
            'www/js/*.js',
            'source/**/*.html',
          ],
        },
        options: {
          watchTask: true,
          proxy: "localhost:4567",
          port: '6789',
        },
      },
    }
  });

  //LOAD TASKS
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-cache-bust');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  //REGISTER CUSTOM TASKS
  grunt.registerTask('default', [], 
    function() {
      grunt.log.write('\n\n***No Default Task Assigned Yet***\n\nPlease run on of the following Grunt tasks: \n$ grunt dev \n$ grunt build\n\n');
  });

  grunt.registerTask('showOptions');
  grunt.registerTask('build:js', ['browserify', 'uglify']);
  grunt.registerTask('build:css', ['copy:fonts', 'sass_globbing', 'sass', 'postcss', 'concat', 'cssmin']);
  grunt.registerTask('dev', ['copy:images', 'build:css', 'build:js', 'browserSync', 'watch']);
  grunt.registerTask('build', ['build:js', 'build:css', 'cacheBust']); //When MM finishes building. We don't need to copy images here since MM will do it for us.
};
