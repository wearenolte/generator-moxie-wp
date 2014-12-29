'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

//TODO - Composer Integration
//TODO - Capistrano Integration
//TODO - Use Some like it neat theme
//TODO - Cleanup the file replacement scripts
//TODO - Create Directory if one does not exist
//TODO - Create Scripts for running SASS (or convert to better patterns - SMACSS)
//TODO - Create Scripts for Initial JS Structure
//TODO - Structure the overall app to follow Moxie Standards
//TODO - Clean up .gitignore
//TODO - Add Deploy Tasks via gulp build&&deploy (using wpcli)
//TODO - Add Plugin Install Tasks (using wpcli)
//TODO - Add All Gulp Tasks (using wpcli)
//TODO - Add Task for Seeding DB (using wpcli)



var MoxieWpGenerator = yeoman.generators.Base.extend({

    initializing: function () {
        this.pkg = require('../package.json');
    },

    //Ask user what the settings for the theme should be
    prompts: function () {

        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the MoxieWp generator.. Some quick questions to get started...'
        ));

        var prompts = [{
            name: 'themeName',
            message: 'What is the name of this theme?'
        }, {
            name: 'themeAuthor',
            message: 'Who is the theme author?',
            default: function (answers) {
                return 'Moxie NYC - http://getmoxied.net';
            }
        }, {
            name: 'themeAuthorURI',
            message: 'What\'s the url of the theme author?',
            default: function (answers) {
                return 'http://getmoxied.net';
            }
        }, {
            name: 'themeURI',
            message: 'What is the url of where this website will be deployed in production?'
        }, {
            name: 'themeDescription',
            message: 'Tell me a brief description of this theme.',
            default: function (answers) {
                return answers.themeName + ' custom theme';
            }
        }];

        this.prompt(prompts, function (props) {
            this.themeName = props.themeName;
            this.themeHandle = props.themeName.trim().replace(/ /g, '-');
            this.themeFunction = props.themeName.toLowerCase().trim().replace(/ /g, '_');
            this.themeTextDomain = props.themeName.toLowerCase().trim().replace(/ /g, '_');
            this.themeAuthor = props.themeAuthor;
            this.themeAuthorURI = props.themeAuthorURI;
            this.themeURI = props.themeURI;
            this.themeDescription = props.themeDescription;

            done();

        }.bind(this));
    },

    getUnderscoreFromGitUrl: function () {
        var cb = this.async();

        this.log.writeln(chalk.green("\n\nGrabbing the latest underscore theme from GitHub, yo!"));
        this.extract('https://github.com/Automattic/_s/archive/master.tar.gz', '.', cb);
        this.log.writeln(chalk.green("\n\nGot that fresh underscores, yo!"));
    },

    setupFilesWithTheCorrectSettingNames: function () {
        var finito = this.async();
        var _this = this;

        function parseDirectory(path) {

            fs.readdir(path, function (err, files) {
                files.forEach(function (file) {

                    var filePath = fs.realpathSync(path + '/' + file);
                    var isDirectory = fs.statSync(filePath).isDirectory()

                    if (isDirectory) {
                        parseDirectory(filePath)
                    } else {
                        fs.readFile(filePath, 'utf8', function (err, data) {
                            data = data.replace(/_s/g, _this.themeName);
                            data = data.replace(/_s_/g, _this.themeFunction);
                            data = data.replace(/Text Domain: _s/g, _this.themeTextDomain);
                            data = data.replace(/ _s/g, ' ' + _this.themeName); //Underscores DocBlocks (prefix with space)
                            data = data.replace(/_s-/g, _this.themeHandle);
                            data = data.replace(/Automattic/g, _this.themeAuthor);
                            data = data.replace(/automattic.com/g, _this.themeAuthorURI);
                            data = data.replace(/underscores.me/g, _this.themeURI);
                            data = data.replace(/Hi. I'm a starter theme called <code>_s<\/code>, or <em>underscores<\/em>, if you like. I'm a theme meant for hacking so don't use me as a <em>Parent Theme<\/em>. Instead try turning me into the next, most awesome, WordPress theme out there. That's what I'm here for./g, _this.themeDescription);

                            //data = data.replace(/themeDesigner/g, _this.themeDesigner);
                            //data = data.replace(/themeDesignerURI/g, _this.themeDesignerURI);

                            fs.writeFile(filePath, data, 'utf8', function (err) {
                                if (err) return console.log(err);
                            });
                        });
                    }

                })
            })
        }

        parseDirectory('.');
        finito();

    },

    writing: {
        app: function () {
            this.dest.mkdir('app');
            this.dest.mkdir('app/templates');

            this.src.copy('_package.json', 'package.json');
            this.src.copy('_bower.json', 'bower.json');
        },

        projectfiles: function () {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');
        }
    },

    end: function () {
        this.installDependencies();
    }

});

module.exports = MoxieWpGenerator;
