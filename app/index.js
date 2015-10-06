'use strict';

var path = require('path');
var fs = require('fs.extra');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var chmod = require('chmod');

var leanRelase = 'https://github.com/moxienyc/Moxie-Lean/archive/master.zip';
var themeName = 'Moxie-Lean-master';

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
          return 'Bare bones WordPress starter theme focused on modularity, scalability and performance.';
        }
      }
    ];

    this.prompt(prompts, function (props) {
      this.themeName = props.themeName;
      this.themeHandle = props.themeName.trim().replace(/ /g, '-');
      this.themeFunction = props.themeName.toLowerCase().trim().replace(/ /g, '_') + '_';
      this.themeTextDomain = 'Text Domain: ' + props.themeName.toLowerCase().trim().replace(/ /g, '_');
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
    this.extract( leanRelase, '.', cb );
    this.log.writeln( chalk.green("\n\Download complete!") );
  },


  moveFilesToCorrectLocation: function () {
    var finito = this.async();
    fs.copyRecursive( themeName, this.themeDirectory, function ( err ) {
      if ( err ) {
        return console.log(chalk.red(err));
      }
      console.log(chalk.green('Theme files are copied!'));
      finito();
    });
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

            fs.readFile(filePath, 'utf8', function (err, data) {

              if ( typeof data === 'undefined' ) {
                return;
              }

              data = data.replace(/(Lean|lean)/g, that.themeName);
              // data = data.replace(/b_/g, _this.themeFunction);
              // data = data.replace(/b/g, _this.themeTextDomain.replace(/Text Domain: /g, ''));
              // data = data.replace(/Text Domain: b/g, _this.themeTextDomain);
              // data = data.replace(/ b/g, ' ' + _this.themeName); //Underscores DocBlocks (prefix with space)
              // data = data.replace(/b/g, _this.themeHandle);
              // data = data.replace(/ b/g, _this.themeTextDomain.replace(/_/g, '' ).replace(/Text Domain:/g, ''));

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
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'),
      {
        name: this.themeName
      }
    );
    this.fs.copyTpl(
      this.templatePath('script'),
      this.destinationPath('./script.sh'),
      {
        themePath: path.normalize( this.themeDirectory )
      }
    );
  },

  install: function(){
    chmod( path.normalize( this.destinationRoot() + '/script.sh'), 775 );
    chmod( path.normalize( this.themeDirectory + '/bin/setup.sh'), 775 );
    chmod( path.normalize( this.themeDirectory + '/bin/bye.sh'), 775 );
    chmod( path.normalize( this.themeDirectory + '/bin/install.sh'), 775  );
    this.spawnCommand( path.normalize( this.destinationRoot() + '/script.sh') ).on('error', function(error){
      console.log(error);
    });
  },
});

module.exports = MoxieWpGenerator;
