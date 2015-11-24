'use strict';

var path = require('path');
var fs = require('fs.extra');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rimraf = require( 'rimraf' );
var chmod = require('chmod');

var leanRelase = 'https://github.com/moxie-leean/Leean/archive/master.zip';
var themeName = 'Leean-master';

var MoxieWpGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  // Ask user what the settings for the theme should be
  prompts: function () {

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Moxie Wordpress generator. ' +
      'Some quick questions to get started...'
    ));

    var prompts = [
      {
      name: 'themeName',
      message: 'What is the name of this theme?'
    },
    {
      name: 'themeAuthor',
      message: 'Who is the theme author?',
      default: function () {
        return 'Moxie NYC - http://getmoxied.net';
      }
    },
    {
      name: 'themeAuthorURI',
      message: 'What\'s the url of the theme author?',
      default: function () {
        return 'http://getmoxied.net';
      }
    },
    {
      name: 'themeURI',
      message: 'What is the url of where this website will be deployed in production?',
      default: function () {
        return 'http://getmoxied.net';
      }
    },
    {
      name: 'themeDescription',
      message: 'Tell me a brief description of this theme.',
      default: function () {
        return 'Bare bones WordPress starter theme.';
      }
    }
    ];

    this.prompt(prompts, function (props) {
      this.themeName = props.themeName;
      this.themeHandle = props.themeName.trim().replace(/ /g, '-');
      this.themeFunction = props.themeName.toLowerCase().trim().replace(/ /g, '_') + '_';
      this.themeTextDomain = props.themeName.toLowerCase().trim().replace(/ /g, '_');
      this.themeAuthor = props.themeAuthor;
      this.themeAuthorURI = props.themeAuthorURI;
      this.themeURI = props.themeURI;
      this.themeDescription = props.themeDescription;
      this.themeDirectory = './wp-content/themes/' + this.themeHandle.toLowerCase() + '/';

      done();

    }.bind(this));
  },

  downloadTheme: function () {
    var cb = this.async();

    this.log.writeln( chalk.green("\n\nGrabbing the latest version from Lean Theme!") );

    this.fetch( leanRelase, '.', {}, function() {
      this.log.writeln( chalk.green("\n\Download complete!") );
      cb();
    }.bind(this));
  },

  removeThemeFiles: function(){
    var done = this.async();
  },

  setupFilesWithTheCorrectSettingNames: function () {
    var finito = this.async();
    var that = this;

    (function parseDirectory(path) {

      fs.readdir(path, function (err, files) {
        if( ! files ) {
          return;
        }
        files.forEach(function (file) {

          var filePath = fs.realpathSync(path + '/' + file);
          var isDirectory = fs.statSync(filePath).isDirectory();

          if ( isDirectory && filePath.indexOf('.git') < 0 ) {
            parseDirectory(filePath);
          } else {
            var re = /\.(php|js|css|scss$)/gim;
            if( re.test(file) !== true ){
              return;
            }

            fs.readFile(filePath, 'utf8', function (err, data) {
              if ( typeof data === 'undefined' ) {
                return;
              }

              // Update theme description
              data = data.replace(
                /Bare bones WordPress starter theme focused on modularity, scalability and performance./,
                that.themeDescription
              );

              // Update theme package
              data = data.replace(
                /@package Lean/gm,
                '@package ' + that.themeHandle.toLowerCase()
              );

              // Update theme name
              data = data.replace(
                /Theme Name: Lean/gm,
                'Theme Name: ' + that.themeName
              );
              var behaviorsName = that.themeName.trim()
              .replace(/\b\w/g, function(match){
                return match.toUpperCase();
              })
              .replace(/\s|-/g, '');

              data = data.replace(
                /window\.Lean = {};/gm,
                'window.' + behaviorsName + ' = {};'
              );
              data = data.replace(
                /Lean\.Behaviors/gm,
                behaviorsName + '.Behaviors'
              );

              fs.writeFile(filePath, data, 'utf8', function (err) {
                if (err) {
                  return console.log(err);
                }
              });
            });
          }
        });
      });
    })('.');
    console.log(chalk.green('Yo ! Theme files are setup!'));
    finito();
  },

  writing: function(){
    var done = this.async();
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'),
      {
        name: this.themeName
      }
    );
    done();
  },
  end: function(){
    var done = this.async();
    console.log( chalk.green.bold('All good, thank you!') );
    done();
  }
});

module.exports = MoxieWpGenerator;
