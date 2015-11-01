'use strict';

var yeoman = require( 'yeoman-generator' );
var fs = require('fs.extra');
var chalk = require( 'chalk' );
var rimraf = require( 'rimraf' );

var MoxieGet = yeoman.generators.Base.extend( {
  initializing: function () {
    this.pkg = require( '../package.json' );
    this.WORDPRESS_URL = 'https://wordpress.org/latest.zip';
    this.TMP_DIRECTORY = './tmp';
  },
  prompting: function(){
    var done = this.async();
    this.WORDPRESS_INSTALLED = fs.existsSync('./wp-load.php');
    if( ! this.WORDPRESS_INSTALLED ){
      console.log( chalk.yellow.bold('Intalling Wordpress, hold on a second, please!') );
    } else {
      console.log( chalk.yellow.bold('Wordpress is already installed!') );
    }
    done();
  },
  createTmpDirectory: function(){
    var done = this.async();
    if( ! this.WORDPRESS_INSTALLED ){
      console.log('\n' + chalk.bold.yellow('Creating temporarily directory'));
      if( ! fs.existsSync( this.TMP_DIRECTORY) ) {
        fs.mkdirSync( this.TMP_DIRECTORY );
      } else {
        console.log( chalk.yellow('Great, we already have one.') );
      }
    }
    done();
  },
  downloadWordpress: function(){
    var done = this.async();
    var message = 'Downloading & extracting WP in '+  this.TMP_DIRECTORY + ' directory';

    if( ! this.WORDPRESS_INSTALLED ){
      console.log('\n' + chalk.bold.yellow( message ));
      this.extract(this.WORDPRESS_URL, this.TMP_DIRECTORY, done);
    } else {
      done();
    }
  },
  removeDefaultWPContent: function(){
    var done = this.async();
    if( ! this.WORDPRESS_INSTALLED ){
      var message = 'Removing default wp-content directory from WP';
      console.log('\n' + chalk.bold.yellow( message ));

      rimraf('./tmp/wordpress/wp-content', function(){
        done();
      });
    } else {
      done();
    }
  },
  moveWordpressFiles: function(){
    var done = this.async();
    if( ! this.WORDPRESS_INSTALLED ){
      console.log( chalk.bold.yellow( 'Copy all files of WP to this directory' ) );
      fs.copyRecursive('./tmp/wordpress', '.', function( error ) {
        if( error ){
          console.log( chalk.bold.red( 'There was an error where the files were copied' ) );
        } else {
          console.log( chalk.yellow( 'All files were copied succesfully' ) );
        }
        done();
      });
    } else {
      done();
    }
  },
  addPluginsDirectory: function(){
    var done = this.async();
    var contentDir = './wp-content';
    var pluginsDir = contentDir + '/plugins';
    var hasWpContentDir = fs.existsSync( contentDir );
    var hasPluginsDirectory = fs.existsSync( pluginsDir );
    if( ! this.WORDPRESS_INSTALLED ){
      console.log( chalk.bold.yellow( 'Create a plugins directory if has not' ) );
      if( hasWpContentDir && ! hasPluginsDirectory ){
        fs.mkdirSync( pluginsDir );
      } else {
        console.log( chalk.yellow('Looks like you do not have wp-content directory') );
      }
    }
    done();
  },
  removeTmpDirectory: function(){
    var done = this.async();
    var message = 'Removing the temporarily directory';
    if( ! this.WORDPRESS_INSTALLED ){
      console.log('\n' + chalk.bold.yellow( message ));

      rimraf('./tmp', function(){
        done();
      });
    } else {
      done();
    }
  },
});

module.exports = MoxieGet;
