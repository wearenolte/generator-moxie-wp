'use strict';
var path = require('path');
var fs = require('fs.extra');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

//TODO - Composer Integration
//TODO - Capistrano Integration
//TODO - Use Some like it neat theme
//TODO - Cleanup the file replacement scripts
//TODO - Create Directory if one does not exist
//TODO - Create Scripts for running SASS (or convert to better patterns - SMACSS)
//TODO - Create Scripts for Initial JS Structure
//TODO - Structure the overall app to follow Moxie Standards
//TODO - Clean up .gitignore
//TODO - Add Deploy Tasks via gulp build&&deploy (using wpcli)
//TODO - Add Plugin Install Tasks (using wpcli)
//TODO - Add All Gulp Tasks (using wpcli)
//TODO - Add Task for Seeding DB (using wpcli)
//TODO - JSJHint
//TODO - PHP CodeSniffer
//TODO - WordPress Coding Standards

var MoxieWpGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  //Ask user what the settings for the theme should be
  prompts: function () {

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the MoxieWp generator.. Some quick questions to get started...'
    ));

    var prompts = [{
      name: 'themeName',
      message: 'What is the name of this theme?'
    }, {
      name: 'themeAuthor',
      message: 'Who is the theme author?',
      default: function (answers) {
        return 'Moxie NYC - http://getmoxied.net';
      }
    }, {
      name: 'themeAuthorURI',
      message: 'What\'s the url of the theme author?',
      default: function (answers) {
        return 'http://getmoxied.net';
      }
    }, {
      name: 'themeURI',
      message: 'What is the url of where this website will be deployed in production?',
      default: function (answers) {
        return 'http://getmoxied.net';
      }
    }, {
      name: 'themeDescription',
      message: 'Tell me a brief description of this theme.',
      default: function (answers) {
        return answers.themeName + ' custom theme';
      }
    }];

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

  getUnderscoreFromGitUrl: function () {
    var cb = this.async();

    this.log.writeln(chalk.green("\n\nGrabbing the latest 'Some Like it Neat' theme from GitHub, yo!"));
    this.extract('https://github.com/digisavvy/some-like-it-neat/archive/master.tar.gz', '.', cb);
    this.log.writeln(chalk.green("\n\nGot that fresh 'Some Like it Neat', yo!"));
  },

  moveFilesToCorrectLocation: function () {

    var finito = this.async();
    var _this = this;

    function moveDirectory( src, dest ) {
      fs.copyRecursive( src, dest, function ( err ) {
        if ( err ) {
          return console.log(chalk.red(err));
        }
        console.log(chalk.green('Yo ! Theme files are copied!'));
        finito();
      } )
    }

    moveDirectory( 'some-like-it-neat-master', this.themeDirectory );
  },

  removeExtraFiles: function() {

    var finito = this.async();

    fs.remove( './some-like-it-neat-master', function( err ) {
      if ( err ) {
        return console.log( chalk.red( err ) );
      }
      console.log(chalk.green('Yo ! Extra Files are removed!'));
      finito();
    });
  },

  setupFilesWithTheCorrectSettingNames: function () {
    var finito = this.async();
    var _this = this;

    function parseDirectory(path) {

      fs.readdir(path, function (err, files) {
        files.forEach(function (file) {

          var filePath = fs.realpathSync(path + '/' + file);
          var isDirectory = fs.statSync(filePath).isDirectory()

          if ( isDirectory && filePath.indexOf('.git') < 0 ) {
            parseDirectory(filePath)
          } else {

            fs.readFile(filePath, 'utf8', function (err, data) {

              if ( typeof data === 'undefined' ) {
                return;
              }

              data = data.replace(/Some Like it Neat/g, _this.themeName);
              data = data.replace(/some_like_it_neat_/g, _this.themeFunction);
              data = data.replace(/some_like_it_neat/g, _this.themeTextDomain.replace(/Text Domain: /g, ''));
              data = data.replace(/Text Domain: some_like_it_neat/g, _this.themeTextDomain);
              data = data.replace(/ Some Like it Neat/g, ' ' + _this.themeName); //Underscores DocBlocks (prefix with space)
              data = data.replace(/some-like-it-neat-/g, _this.themeHandle);
              data = data.replace(/somelikeitneat/g, _this.themeTextDomain.replace(/_/g, '' ).replace(/Text Domain:/g, ''));
              data = data.replace(/Alex Vasquez/g, _this.themeAuthor);
              data = data.replace(/http:\/\/alexhasnicehair.com/g, _this.themeAuthorURI);
              data = data.replace(/https:\/\/github.com\/digisavvy\/some-like-it-neat/g, _this.themeURI);
              data = data.replace(/A simple yet advanced Starter Theme built using _S, Bourbon and Neat \(http:\/\/underscores\.me, http:\/\/bourbon\.io, http:\/\/neat\.bourbon\.io\)\. Please refer to the README\.md file for basic usage instructions and prerequisites\. You can always grab the latest version over at http:\/\/github\.com\/digisavvy\.some-like-it-neat/g, _this.themeDescription);

              //data = data.replace(/themeDesigner/g, _this.themeDesigner);
              //data = data.replace(/themeDesignerURI/g, _this.themeDesignerURI);

              fs.writeFile(filePath, data, 'utf8', function (err) {
                if (err) return console.log(err);
              });
            });
          }

        })
      })
    }

    parseDirectory('.');
    console.log(chalk.green('Yo ! Theme files are setup!'));
    finito();
  },

  writing: {
    // Going to theme directory and then copy editorconfig.
    projectfiles: function () {
      this.src.copy( 'editorconfig', this.themeDirectory + '.editorconfig' );
    }
  },

  end: function () {
    // Going to theme directory and then install bower & npm.
    process.chdir( path.normalize( this.themeDirectory ) );
    this.installDependencies();

    // Composer Installations
    this.spawnCommand( 'composer', ['install'] );
    console.log( chalk.green( 'Yo ! Just started intalling Composer Dependencies. Running ' ) + chalk.yellow( 'composer install' ) + chalk.green( '. If this fails, try running the command yourself.' ) );

    // Returning back to Root directory.
    process.chdir( path.normalize( this.destinationRoot() ) );
  }

});

module.exports = MoxieWpGenerator;
