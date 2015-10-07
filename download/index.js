'use strict';

var yeoman = require( 'yeoman-generator' );
var chalk = require( 'chalk' );

var MoxieDownload = yeoman.generators.Base.extend( {
    initializing: function () {
        this.pkg = require( '../package.json' );
    },
    prompting: function(){
      var done = this.async(); var prompt = {
        name: 'install',
        message: 'Do you want to download the latest version of Wordpress [yes / no]?:'
      };

      this.prompt(prompt, function(answers){
        var answer = answers.install.toLowerCase();
        if( answer === 'yes' ){
          done();
        } else {
          console.log('\n' + chalk.green('Have a nice day!'));
        }
      }.bind( this));
    },
    install: function(){
      var done = this.async();
      this.composeWith('moxie-wp:get');
      done();
    },
    end: function(){
      var message = 'We are done, thanks, and have a nice day';
      console.log('\n' + chalk.bold.green( message ));
    }
});

module.exports = MoxieDownload;
