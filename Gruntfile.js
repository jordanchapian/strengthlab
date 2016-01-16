module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["www/build/app.js", "www/build/app.min.js"],

    copy: {
      fonts:{
          files:[{
                  src: './bower_components/ionic/fonts/*',
                  dest: './www/build/fonts/',
                  flatten:true,
                  expand: true
              }]
      }
    },

    concurrent:{
      dev:{
        tasks:['watch'],
        options:{
          logConcurrentOutput:true
        }
      }
    },

    'angular-builder': {
      options: {
        mainModule: 'strengthlab',
        externalModules:['ui.router','ngAnimate', 'ionic']
      },
      app: {
        src:  ['www/src/**/*.js','./www/build/template.js'],
        dest: 'www/build/app.js'
      }
    },

    bower_concat: {
      all: {
        dest: 'www/build/dependencies/dependencies.js',
        cssDest: 'www/build/dependencies/dependencies.css',
        dependencies: {
          'angular': 'jquery'
        },
        exclude:[],
        bowerOptions: {
          relative: false
        }
      }
    },

  sass: {
      dist: {
          files: {
              './www/build/app.css': './www/scss/app.scss'
          }
      }
  },

  watch: {

    scripts: {
          files: ['./www/src/**/*.js'],
          tasks: ['clean', 'angular-builder'],
          options: {
            livereload: false,
            spawn: false,
          },
        },

    css:{
          files: ['./www/scss/**/*.scss'],
          tasks: ['sass', 'postcss'],
          options: {
            livereload: false,
            spawn: false,
          }
    },

    templates:{
        files: ['./www/src/**/*.tpl.html'],
        tasks: ['ngtemplates','angular-builder'],
        options:{
          livereload: false,
          spawn:false
        }
    }
    
  },

  postcss: {
      options: {
          map: true,
          processors: [
              require('autoprefixer')({
                  browsers: ['last 2 versions']
              })
          ]
      },
      dist: {
          src: './www/build/app.css'
      }
  },

  ngtemplates:  {
    "strengthlab":{
      cwd: './www/src',
      src:      './**/*.tpl.html',
      dest:     './www/build/template.js'
    }
  }

});


grunt.loadNpmTasks('grunt-bower-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-angular-templates');
grunt.loadNpmTasks ('grunt-angular-builder');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-contrib-sass');

//it is anticipated that jshint is not needed until code is written... The baseline should not contain lint warniangs.
grunt.registerTask('default', ['clean','sass','postcss', 'ngtemplates','bower_concat', 'angular-builder', 'copy']);
grunt.registerTask('init', ['clean','sass','postcss', 'ngtemplates','bower_concat', 'angular-builder', 'copy']);
grunt.registerTask('dev', ['concurrent']);

};