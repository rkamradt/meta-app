module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-simple-mocha');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          node: true,
          mocha: true,
          camelcase: false
        },
        files: {
          src: ['Gruntfile.js', 'index.js', 'meta-data/**/*.js', 'test/**/*.js']
        }
    },
    clean: {
      build: {
        src: [ 'dist' ]
      },
      all: {
        src: ['node_modules']
      }
    },
    copy: {
        build: {
          expand: true,
          cwd: 'static/',
          src: '**',
          dest: 'dist/',
        }
    },
    watch: {
      tests: {
        files:  [ 'index.js', 'meta-data/**/*.js', 'test/**/*.js','test/**/*.json'],
        tasks:  [ 'simplemocha' ],
        options: {
          spawn: false
        }
      }
    },
    simplemocha: {
        options: {
            globals: ['should'],
            timeout: 3000,
            ignoreLeaks: false,
//            reporter: 'nyan',
            ui: 'bdd'
        },

        all: {
            src: ['test/**/*.test.js']
        }
    }
  });
  grunt.registerTask('build', ['jshint', 'copy:build' ]);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jshint','simplemocha' ]);

};
