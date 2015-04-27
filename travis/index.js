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

		// Have Yeoman greet the user.
		this.log( yosay(
			'Yo ! We will be setting up Travis CI meta file for your project. We will be placing a "travis.yml" file into current directory.'
		) );
	},

	writing: {
		// Going to repo directory and then copy files.
		projectfiles: function () {

			this.src.copy( 'travis.yml', '.travis.yml' );
			this.src.copy( '_ci.sh', 'ci.sh' );
		}
	},

	end: function () {
		console.log( chalk.green( 'Yo ! Travis CI is setup for your repo.' ) );
	}
} );

module.exports = MoxieTravis;
