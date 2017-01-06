module.exports = function(grunt) {
  var config ={
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Browserify
     *
     * http://browserify.org/
     *
     * CommonJS dependency management including the ES2015 transpile plugin
     * for modern JavaScript techniques.
     */
    browserify: {
      options: {
        transform: [
          ['babelify', { presets: ['es2015'] }]
        ]
      },
      main: {
        src: ['source/js/main.js'],
        dest: 'www/js/main.js',
      }
    },

    /**
     * BrowserSync
     *
     * https://browsersync.io/
     *
     * During dev we have the Middleman server running on port 4567. We also
     * have the Node server running on port 5678 to serve static assets like
     * images, CSS and JavaScript. Then we have BrowserSync running on port
     * 6789 to inject CSS/JavaScript changes into the browser. These are not
     * used during the production build process.
     */
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'www/css/*.css',
            'www/js/*.js',
            'source/**/*.html',
            'source/**/*.erb'
          ],
        },
        options: {
          watchTask: true,
          proxy: "localhost:4567",
          port: '6789'
        }
      }
    },

    /**
     * Cache busting
     *
     * https://github.com/hollandben/grunt-cache-bust
     *
     * Fingerprints asset filenames for cache busting
     */
    cacheBust: {
      build: {
        options: {
          baseDir: './www/',
          assets: ['js/**/*.js', 'css/**/*.css', 'img/**/*.png', 'img/**/*.gif', 'img/**/*.jpg', 'img/**/*.svg'],
          deleteOriginals: true
        },
        files: [{
          expand: true,
          cwd: 'www/',
          src: ['**/*.js', '**/*.css', '**/*.html', '**/*.json']
        }]
      }
    },

    /**
     * Copy files
     *
     * https://github.com/gruntjs/grunt-contrib-copy
     *
     * We only need to copy images during development since Middleman will
     * handle that during a production build.
     */
    copy: {
      favicons: {
        files: [{
          expand: true,
          cwd: 'source',
          src: ['favicon-*', 'touch-icon-*'],
          dest: 'www/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'source/fonts',
          src: ['**'],
          dest: 'www/fonts',
        }],
      },
      images: {
        files: [{
          expand: true,
          cwd: 'source/img',
          src: ['**'],
          dest: 'www/img',
        }],
      },
      pdfs: {
        files: [{
          expand: true,
          cwd: 'source/pdfs',
          src: ['**'],
          dest: 'www/pdfs'
        }]
      },
      vendors: {
        files: [{
          expand: true,
          cwd: 'source/vendor',
          src: ['jquery-*.js'],
          dest: 'www/js'
        }]
      },
      videos: {
        files: [{
          expand: true,
          cwd: 'source/videos',
          src: ['**'],
          dest: 'www/videos'
        }]
      }
    },

    /**
     * CSSMin
     *
     * https://github.com/gruntjs/grunt-contrib-cssmin
     *
     * Clean and minify CSS files
     */
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'www/css/',
          src: ['*.css'],
          dest: 'www/css/',
          ext: '.css'
        }]
      }
    },

    /**
     * PostCSS
     *
     * http://postcss.org/
     *
     * Use PostCSS for browser prefixing. Generally recommended on for use
     * with build scripts, not in development as it can be slow.
     */
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions, ie >= 10'}),
          require('postcss-flexbugs-fixes')()
        ]
      },
      dist: {
        src: 'www/css/style.css',
        dest: 'www/css/style.css'
      }
    },

    /**
     * Grunt SASS compiler
     *
     * https://github.com/sindresorhus/grunt-sass
     */
    sass: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          'www/css/style.css': 'source/css/style.scss'
        }
      }
    },

    /**
     * Uglify
     *
     * https://github.com/gruntjs/grunt-contrib-uglify
     *
     * Optimize JavaScript files for production build.
     */
    uglify: {
      options: {
        preserveComments: "some",
        mangle: {
          except: ['jQuery']
        },
        sourceMap: true
      },
      my_target: {
        files: {
          'www/js/main.js': ['www/js/main.js']
        },
      },
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
        tasks: ['sass', 'postcss'],
      },
      images: {
        files: ['source/img/**'],
        tasks: ['copy:images'],
      },
      videos: {
        files: ['source/videos/**'],
        tasks: ['copy:videos'],
      },
      pdfs: {
        files: ['source/pdfs/**'],
        tasks: ['copy:pdfs'],
      },
      fonts: {
        files: ['source/fonts/**'],
        tasks: ['copy:fonts'],
      },
      configFiles: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true,
        },
      },
    }
  };

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('showOptions');

  //When MM finishes building. We don't need to copy images here since MM will do it for us.
  grunt.registerTask('build', ['copy:favicons', 'copy:fonts', 'copy:vendors', 'copy:videos', 'copy:pdfs', 'build:js', 'build:css', 'cacheBust']);
  grunt.registerTask('build:css', ['sass', 'postcss', 'cssmin']);
  grunt.registerTask('build:js', ['browserify', 'uglify']);

  grunt.registerTask('dev:js', ['browserify']);
  grunt.registerTask('dev:css', ['sass', 'postcss'])

  grunt.registerTask('default', ['copy:images', 'copy:favicons', 'copy:fonts', 'copy:vendors', 'copy:videos', 'copy:pdfs', 'dev:js', 'dev:css', 'browserSync', 'watch']);
};
