'use strict';
var yeoman = require( 'yeoman-generator' );
var chalk = require( 'chalk' );

var MoxieWorkflow = yeoman.generators.Base.extend( {
  initializing: function () {
    this.pkg = require( '../package.json' );
  },
  prompting: function(){
    var done = this.async();
    var prompt = {
      name: 'behaviour',
      message: 'Do you want to create the workflow file: y/n'
    };

    this.prompt(prompt, function(answers){
      this.answer = answers.behaviour.toLowerCase();
      done();
    }.bind( this));
  },
  getTemplate: function(){
    if( this.answer === 'y'){
      this.fs.copyTpl(
        this.templatePath('workflow.md'),
        this.destinationPath( './workflow.md' )
      );
    } else {
      console.log(chalk.bgGreen(
        'Ok, maybe next time, thanks'
      ));
    }
  }
});

module.exports = MoxieWorkflow;
