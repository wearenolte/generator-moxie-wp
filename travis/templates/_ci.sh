#!/bin/bash

# BEFORE SCRIPT

set -e

export REPO_DIR=$(pwd)

export THEME_DIR='wp-content/themes/example-theme'

export PHPCS_DIR=/tmp/phpcs
export PHPCS_GITHUB_SRC=squizlabs/PHP_CodeSniffer
export PHPCS_GIT_TREE=master
export PHPCS_IGNORE='library/vendors/**,/assets/js/vendor/**'
export WPCS_DIR=/tmp/wpcs
export WPCS_GITHUB_SRC=WordPress-Coding-Standards/WordPress-Coding-Standards
export WPCS_GIT_TREE=master
export PATH_INCLUDES=./
export WPCS_STANDARD=$(if [ -e phpcs.ruleset.xml ]; then echo phpcs.ruleset.xml; else echo WordPress-Core; fi)
export JSHINT_IGNORE_PATH='/tmp/.jshintignore'

# Install PHP_CodeSniffer and the WordPress Coding Standards
mkdir -p $PHPCS_DIR && curl -L https://github.com/$PHPCS_GITHUB_SRC/archive/$PHPCS_GIT_TREE.tar.gz | tar xvz --strip-components=1 -C $PHPCS_DIR
mkdir -p $WPCS_DIR && curl -L https://github.com/$WPCS_GITHUB_SRC/archive/$WPCS_GIT_TREE.tar.gz | tar xvz --strip-components=1 -C $WPCS_DIR
$PHPCS_DIR/scripts/phpcs --config-set installed_paths $WPCS_DIR

# Install JSHint
if ! command -v jshint >/dev/null 2>&1; then
	npm install -g jshint
fi

cd $REPO_DIR

# SCRIPT

cd $THEME_DIR

# Run PHP syntax check
find $PATH_INCLUDES -path ./bin -prune -o \( -name '*.php' \) -exec php -lf {} \;

# Run PHP_CodeSniffer
$PHPCS_DIR/scripts/phpcs --standard=$WPCS_STANDARD $(if [ -n "$PHPCS_IGNORE" ]; then echo --ignore=$PHPCS_IGNORE; fi) $(find $PATH_INCLUDES -name '*.php')
echo 'phpcs done';
# Run JSHint
echo -e "**/node_modules/**\n**/bower_components/**\n**/assets/js/vendor/**\n**/library/vendors/**\ngulpfile.js\n**/*min.js\n**/*production.js" > $JSHINT_IGNORE_PATH
jshint --exclude-path=$JSHINT_IGNORE_PATH $(find ./ -type d \( -name 'node_modules' -o -name 'bower_components' -o -wholename '**/assets/js/vendor' -o -wholename '**/library/vendors' \) -prune -o -name '*.js' ! -name 'gulpfile.js'  ! -wholename '**/*min.js' ! -wholename '**/*production.js' -print)
echo 'jshint done';
