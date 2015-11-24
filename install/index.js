'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var rimraf = require('rimraf');
var chalk = require('chalk');
var fs = require('fs.extra');

var MoxieInstall = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
  prompts: function () {
    var done = this.async();
    this.log(yosay(
      'Welcome to the Moxie Wordpress Set Up. ' +
      'from a git repo'
    ));

    var prompts = [
      {
      name: 'repoURL',
      message: 'Enter the url of the repository',
      default: function(){
        return '';
      }
    },
    ];

    this.prompt(prompts, function( props ){
      this.repoURL = props.repoURL;
      done();
    }.bind( this ));
  },
  cloneRepo: function(){
    var done = this.async();
    if( fs.existsSync('.git') ){
      console.log( chalk.yellow.bold('Git repo is already installed') );
      done();
    } else {
      var clone = this.spawnCommand('git', ['clone', this.repoURL, '.']);
      clone.on('close', function(code){
        if( code === 0 ){
          console.log( chalk.green.bold('Repo cloned succesfully') );
        } else {
          console.log( chalk.red.bold('There was an error during the clone') );
        }
        done();
      });
    }
  },
  install: function(){
    var done = this.async();
    // Install and get wordpress
    this.composeWith('moxie-wp:get');
    done();
  },
  end: function(){
    var done = this.async();
    // Install dependencies
    this.composeWith('moxie-wp:setup');
    console.log( chalk.green.bold('All good, thank you!') );
    done();
  }
});
module.exports = MoxieInstall;
