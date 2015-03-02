module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-simple-mocha');
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
          src: ['Gruntfile.js', 'meta-data/**/*.js', 'test/**/*.js']
        }
    },
    clean: {
      all: {
        src: ['node_modules']
      }
    },
    watch: {
      tests: {
        files:  [ 'index.js', 'meta-data/**/*.js', 'test/**/*.js','test/**/*.json'],
        tasks:  [ 'jshint', 'simplemocha' ],
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
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jshint','simplemocha' ]);

};
