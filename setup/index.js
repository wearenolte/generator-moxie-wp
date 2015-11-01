'use strict';

var yeoman = require( 'yeoman-generator' );
var fs = require('fs.extra');
var chalk = require( 'chalk' );
var path = require('path');
var chmod = require('chmod');

var MoxieSetup = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require( '../package.json' );
    this.THEMES_PATH = './wp-content/themes/';
    this.THEME_PATH = '';
  },
  searchTheme: function(){
    var done = this.async();
    if( fs.existsSync( this.THEMES_PATH ) ){
      var files = fs.readdirSync( this.THEMES_PATH );
      if( files && files.length > 0 ){
        this.THEME_PATH = this.THEMES_PATH + files[0];
        console.log( chalk.green.bold('The path to the theme is: ' + this.THEME_PATH ) );
      } else {
        console.log( chalk.red.bold('Looks like you dont have themes') );
      }
    } else {
      console.log( chalk.red.bold('There is no wp-content directory') );
    }
    done();
  },
  moveToThemeDirectory: function(){
    var done = this.async();
    try {
      process.chdir( this.THEME_PATH );
      console.log( chalk.green.bold('We are now in the theme directory' ) );
    } catch (err) {
      console.log( chalk.red.bold('There was an error where changing directory') );
    }
    done();
  },
  installDependencies: function(){
    var done = this.async();
    console.log( chalk.bold.yellow( 'Trying to install dependencies' ) );
    if( fs.existsSync( './bin/setup.sh' ) ){
      chmod( './bin/setup.sh', 775 );
      chmod( './bin/bye.sh', 775 );
      var runScript = this.spawnCommand( './bin/setup.sh' );
      console.log( chalk.bold.yellow( 'Looks like do we have a setup shell script we are going to use that' ) );
      runScript.on('close', function( code ){
        if( code === 0 ){
          console.log( chalk.green.bold('Dependencies installed succesfully') );
        } else {
          console.log( chalk.red.bold(
            'There was a problem running the script,try to running manually' + "\n" +
            './bin/install.sh in the theme directory'
          ));
        }
        done();
      });
    } else {
      console.log( chalk.bold.yellow( 'Looks like we have to install all manually, wait.' ) );
      this.installManual = true;
      done();
    }
  },
  installManuLDependencies: function(){
    var done = this.async();
    if( this.installManual && fs.existsSync( './package.json') ){
      console.log( chalk.bold.yellow( 'Installing node packages...' ) );
      var npm = this.spawnCommand('npm', ['install']);
      npm.on('close', function( code ){
        if( code === 0 ){
          console.log( chalk.green.bold( 'Node packages has been installed succesfully' ) );
        } else {
          console.log( chalk.red.bold( 'There was a problem running NPM try to run manually: npm install') );
        }
        done();
      });
    } else {
      done();
    }
  },
  installBowerManually: function(){
    var done = this.async();
    if( this.installManual && fs.existsSync( './bower.json') ){
      var bower = this.spawnCommand('bower', ['install']);
      console.log( chalk.bold.yellow( 'Installing bower packages...' ) );
      bower.on('close', function( code ){
        if( code === 0 ){
          console.log( chalk.green.bold( 'Bower dependencies has been installed succesfully' ) );
        } else {
          console.log( chalk.red.bold( 'There was a problem when bower dependencies where installed try to run manually: bower install' ) );
        }
        done();
      });
    } else {
      done();
    }
  },
  installComposerManually: function(){
    var done = this.async();
    if( this.installManual && fs.existsSync( './composer.json') ){
      var composer = this.spawnCommand('composer', ['install']);
      console.log( chalk.bold.yellow( 'Installing composer packages...' ) );
      composer.on('close', function( code ){
        if( code === 0 ){
          console.log( chalk.green.bold( 'Composer dependencies has been installed succesfully' ) );
        } else {
          console.log( chalk.red.bold( 'There was a problem when composer dependencies where installed try to run manually: php composer.phar install && php composer.phar update or try to install composer' ) );
        }
        done();
      });
    } else {
      done();
    }
  },
  returnRoot: function(){
    var done = this.async();
    try {
      process.chdir( path.normalize( this.destinationRoot() ) );
      console.log( chalk.green.bold('We are in the root of the repo' ) );
    } catch (err) {
      console.log( chalk.red.bold('There was an error where changing directory to the root of the repo') );
    }
    done();
  }
});

module.exports = MoxieSetup;
