/**
 * Created by udit on 26/2/15.
 */
'use strict';

var yeoman = require( 'yeoman-generator' );
var https = require( 'https' );
var fs = require('fs.extra');
var yosay = require( 'yosay' );
var path = require( 'path' );
var WP = require( 'wp-cli' );
var chalk = require( 'chalk' );

var MoxieWpTest = yeoman.generators.Base.extend( {
    initializing: function () {
        this.pkg = require( '../package.json' );
    },

    //Ask user what the settings for the theme should be
    prompts: function () {
	    var done = this.async();

	    // Have Yeoman greet the user.
	    this.log( yosay(
		    'Yo ! We will be setting up test data for your site.. Some quick ' +
        'questions to get started...Please provide WordPress webroot path for ' +
        'your site. We will be using wp-cli utility for this. So it is required.'
	    ) );

	    var prompts = [ {
			name: 'wpPath',
			message: 'WordPress Webroot Path: '
		} ];

	    this.prompt( prompts, function ( props ) {
		    this.wpPath = props.wpPath;

		    done();

	    }.bind( this ) );
    },

	// Download WP Test Data xml file.
	downloadWPTestData: function() {
		var cb = this.async();
		var that = this;
		var url = 'https://raw.githubusercontent.com/manovotny/wptest/master/wptest.xml';
		var req = https.get( url, function( res ) {
			// save the data
			var xml = '';
			res.on( 'data', function( chunk ) {
				xml += chunk;
			} );

			res.on( 'end', function() {
				fs.writeFile( that.destinationRoot() + '/wptest.xml', xml, function( err ) {
					if ( err ) {
						that.log.writeln( chalk.red( err ) );
					} else {
						that.log.writeln( chalk.green( "\n\nThe WP Test data file was saved! yo!" ) );
					}
					cb();
				} );
			} );
		} );

		req.on( 'error', function( err ) {
			if ( err ) {
				that.log.writeln( chalk.red( err ) );
			}
			cb();
		});
	},

	// Install WordPress Importer Plugin
	_installWordPressImporter: function( _WP, callback ) {

		var that = this;

		_WP.plugin.install( 'wordpress-importer', function( err, result ) {

			if ( ! err ) {
				that.log.writeln( chalk.green( result ) );
				that.log.writeln( chalk.green( "\n\nYo ! WordPress Importer plugin is installed! yo!" ) );

				that._activateWordPressImporter( _WP, callback );

			} else {
				that.log.writeln( chalk.red( err ) );
				that._importWPTestDataCallback( callback );
			}
		} );
	},

	// Activate WordPress Importer Plugin
	_activateWordPressImporter: function( _WP, callback ) {

		var that = this;

		_WP.plugin.activate( 'wordpress-importer', function( err, result ) {
			if ( ! err ) {
				that.log.writeln( chalk.green( result ) );
				that.log.writeln( chalk.green( "\n\nYo ! WordPress Importer plugin is activated! yo!" ) );

				that._importWPTestData( _WP, callback );
			} else {
				that.log.writeln( chalk.red( err ) );
				that._importWPTestDataCallback( callback );
			}
		} );
	},

	// Import Test Data WP-CLI method call.
	_importWPTestData: function( _WP, callback ) {

		var that = this;

		this.log.writeln( chalk.yellow( "\n\nWe are starting migration. This might take some time. Please be patient!" ) );

		_WP.import( this.wpTestXMLPath, { authors: 'create' }, function( err, result ) {
			if ( ! err ) {
				that.log.writeln( chalk.green( result ) );
				that.log.writeln(chalk.green("\n\nThe WP Test data is migrated! yo!"));
				that._importWPTestDataCallback( callback );
			} else {
				that.log.writeln( chalk.red( err ) );
				that._importWPTestDataCallback( callback );
			}
		} );
	},

	// Callback for Sync Execution
	_importWPTestDataCallback: function( callback ) {
		// Perform Common task before giving the execution control.
		callback();
	},

	// WP-CLI Import Operation
	importWPTestData: function() {

		var cb = this.async();
		var that = this;
		this.wpTestXMLPath = that.destinationRoot() + '/wptest.xml';

		// Going to WordPress Installation Directory and then install/activate/migrate.
		process.chdir( path.normalize( this.wpPath ) );

		WP.discover( { path: this.wpPath }, function( WP ) {

			WP.plugin.status( 'wordpress-importer', function( err, result ) {

				if ( ! err ) {
					if ( result.indexOf( 'Status: Inactive' ) !== -1 ) {
						that._activateWordPressImporter( WP, cb );
					} else {
						that._importWPTestData( WP, cb );
					}
				} else {
					that._installWordPressImporter( WP, cb );
				}

			} );

		} );
	},

	// Remove Extra file
	removeWPTestDataFile: function() {
		var finito = this.async();

		fs.remove( this.wpTestXMLPath, function( err ) {
			if ( err ) {
				return console.log( chalk.red( err ) );
			}
			console.log(chalk.green('Yo ! Extra Files are removed!'));
			finito();
		});
	}
});

module.exports = MoxieWpTest;
