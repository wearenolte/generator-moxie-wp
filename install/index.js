'use strict';

var path = require('path');
var chmod = require('chmod');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

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
      {
        name: 'themeName',
        message: 'Enter the name of the theme',
        default: function(){
          return '';
        },
      }
    ];

    this.prompt(prompts, function( props ){
      this.repoURL = props.repoURL;
      this.themeName = props.themeName;
      done();
    }.bind( this ));
  },
  writing: function(){
    this.fs.copyTpl(
      this.templatePath('script'),
      this.destinationPath('../script.sh'),
      {
        repoURL: path.normalize( this.repoURL ),
        themeName: this.themeName,
      }
    );
  },
  install: function(){
    chmod( '../script.sh', 775 );
    this.spawnCommand( '../script.sh').on('error', function(error){
      console.log(error);
    });
  }
});
module.exports = MoxieInstall;
