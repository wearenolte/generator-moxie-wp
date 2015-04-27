/**
 * Created by udit on 28/04/15.
 */
'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require( 'path' );

var MoxieTravis = yeoman.generators.Base.extend( {
	initializing: function () {
		this.pkg = require( '../package.json' );
	},

	//Ask user what the settings for the theme should be
	prompts: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log( yosay(
		'Yo ! We will be setting up Travis CI meta file for your project. Some quick questions to get started...Please provide root path for your repository. We will be placing a "travis.yml" file into your root. So it is required.'
		) );

		var prompts = [ {
			name: 'repoPath',
			message: 'Repository Path: '
		} ];

		this.prompt( prompts, function ( props ) {

			var lastChar = props.repoPath.substr(-1); // Selects the last character
			if (lastChar != '/') {         // If the last character is not a slash
				props.repoPath = props.repoPath + '/';            // Append a slash to it.
			}

			this.repoPath = props.repoPath;

			done();

			}.bind( this ) );
		},

		writing: {
			// Going to repo directory and then copy files.
			projectfiles: function () {

				this.src.copy( 'travis.yml', this.repoPath + '.travis.yml' );
				this.src.copy( '_ci.sh', this.repoPath + 'ci.sh' );
			}
		},

		end: function () {
			console.log( chalk.green( 'Yo ! Travis CI is setup for your repo.' ) );
		}
} );

module.exports = MoxieTravis;
