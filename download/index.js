var yeoman = require( 'yeoman-generator' );
var https = require( 'https' );
var fs = require('fs.extra');
var chalk = require( 'chalk' );
var rimraf = require( 'rimraf' );

var MoxieDownload = yeoman.generators.Base.extend( {
    initializing: function () {
        this.pkg = require( '../package.json' );
    },
    prompting: function(){
      var done = this.async(); var prompt = {
        name: 'install',
        message: 'Do you want to install Wordpress [yes / no]?:'
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
    createTmpDirectory: function(){
      var directory = './tmp';
      console.log('\n' + chalk.bold.yellow('Creating temporarily directory'));

      if(! fs.existsSync( directory ) ) {
        fs.mkdirSync( directory );
      } else {
        console.log( chalk.yellow('Great, we already have one.') );
      }
    },
    downloadWordpress: function(){
      var url = 'https://wordpress.org/latest.zip'
      var directory = './tmp';
      var cb = this.async();
      var message = 'Downloading & extracting WP in '+  directory + ' directory';

      console.log('\n' + chalk.bold.yellow( message ));
      this.extract(url, directory, cb);
    },
    removeDefaultWPContent: function(){
      var cb = this.async();
      var that = this;
      var message = 'Removing default wp-content directory from WP';
      console.log('\n' + chalk.bold.yellow( message ));

      rimraf('./tmp/wordpress/wp-content', function(){
        cb();
      });
    },
    moveWordpressFiles: function(){
      var finito = this.async();
      var that = this;
      var messages = {
      };

      console.log( chalk.bold.yellow( 'Copy all files of WP to this directory' ) );
      fs.copyRecursive('./tmp/wordpress', '.', function( error ) {
        if( error ){
          console.log( chalk.bold.red( 'There was an error where the files were copied' ) );
        } else {
          console.log( chalk.yellow( 'All files were copied succesfully' ) );
        }
        finito();
      });
    },
    addPluginsDirectory: function(){
      var contentDir = './wp-content';
      var pluginsDir = contentDir + '/plugins';
      var hasWpContentDir = fs.existsSync( contentDir );
      var hasPluginsDirectory = fs.existsSync( pluginsDir );

      console.log( chalk.bold.yellow( 'Create a plugins directory if has not' ) );
      if( hasWpContentDir && ! hasPluginsDirectory ){
          fs.mkdirSync( pluginsDir );
      } else {
        console.log( chalk.yellow('Looks like you do not have wp-content directory') );
      }
    },
    removeTmpDirectory: function(){
      var cb = this.async();
      var message = 'Removing the temporarily directory';
      console.log('\n' + chalk.bold.yellow( message ));

      rimraf('./tmp', function(){
        cb();
      });
    },
    end: function(){
      var message = 'We are done, thanks, and have a nice day';
      console.log('\n' + chalk.bold.green( message ));
    }
});

module.exports = MoxieDownload;
