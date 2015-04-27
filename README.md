# generator-moxie-wp [![Build Status](https://secure.travis-ci.org/moxienyc/generator-moxie-wp.png?branch=master)](https://travis-ci.org/jeffreynolte/generator-moxie-wp)

> [Yeoman](http://yeoman.io) generator

## Prerequisites

- You'll need to download and install Node. Ref : https://nodejs.org
    - Preferably install node using nvm. It helps you maintain different versions of node. Ref : https://github.com/creationix/nvm
- You'll need to install npm (Node Package Manager)
    - Node comes with npm installed so you should have a version of npm. However, npm gets updated more frequently than Node does, so you'll want to make sure it's the latest version.

```bash
npm install npm -g
```

- Test: Run `npm -v`. The version should be higher than 2.1.8.

## Getting Started

To install yeoman from npm, run:

```bash
npm install -g yo
```

To install generator-moxie-wp from npm, run:

```bash
npm install -g generator-moxie-wp
```

Finally, initiate the generator:

```bash
yo moxie-wp
```

## Install wordpress files for the repo.

- To download the latest version of wordpress just run

```bash
yo moxie-wp:download
```

This command will download the latest version of WP and extract the files in the current directory.


**Note** It will install the files in the current directory, so make sure to be in the directory where you want the files**

## WP Test Data for Theme Testing

- Just run following command from anywhere in the terminal.

```bash
yo moxie-wp:wptest
```

- It will ask you for the WordPress installation path. Provide one and press enter.
    - E.g., my WordPress installation is at `/var/www/example.com/htdocs/`. That's where my WordPress index.php & wp-load.php is available. So I'll give that path as input here.
- That's it ! The tool will download the test data XML file. Install/Activate WordPress Importer plugin on your site and import all the test data to your site. This part of importing is a heavy downloading process, so it might take some time depending on your internet connection.

## Travis CI Setup for WordPress Theme Repository

- Just run following command anywhere in the terminal.

```bash
yo moxie-wp:travis
```

- It will ask you for the theme repository path. Provide one and press enter.
    - E.g., my theme repository is at `/Users/udit/Documents/test-yeo`. So I'll give that path as input here.
- That's it. The tool will place a `.travis.yml` file for [Travis-CI](travis-ci.com) integration and `ci.sh` script file which will be executed on every commit pushed to repo.

## How to use it locally

- `git clone https://github.com/moxienyc/generator-moxie-wp.git`
- `cd generator-moxie-wp`
- `npm link`
- Create a project folder for which you need `moxie-wp` generator. (Not within the `generator-moxie-wp` folder) i.e., `mkdir testing-out-loud && cd testing-out-loud`
- `yo moxie-wp` and see the magic.

## Some Like it Neat Guidelines

- This generator downloads [Some Like it Neat](https://github.com/digisavvy/some-like-it-neat) theme and sets it up for you.
- You can explore its documentation to know more about the theme.
- Here are a few important steps that you might have to follow if you're stuck.
    - **npm dependency failed**
        - Go to theme directory i.e., `wp-content/themes/xyz-theme` and run `npm install`
    - **bower dependency failed**
        - Go to theme directory i.e., `wp-content/themes/xyz-theme` and run `bower install`
    - **composer dependency failed (phpcs)**
        - Go to theme directory i.e., `wp-content/themes/xyz-theme` and run `composer install`
- **Assets Generation**
    - To generate CSS/JS build, you just need to run `gulp` in the theme directory. It will perform all the default gulp tasks for the theme which includes following
        - compile sass to generate css and other styles related tasks.
        - concat all the JS into one JS file and other JS related tasks
        - jsHint code scan for JS standards
        - phpcs code scan for WordPress standards

## Roadmap
- Recess integration for CSS standardization: http://twitter.github.io/recess/
- WordPress coding standards: https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards
- PHP Code Sniffer Integration: https://github.com/squizlabs/PHP_CodeSniffer
- JSHint: http://jshint.com/
- PHPUnit for unit tests
- Editor Config: http://editorconfig.org/
- Travis CI: https://travis-ci.org/recent
- Pre-Commit hooks: http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
