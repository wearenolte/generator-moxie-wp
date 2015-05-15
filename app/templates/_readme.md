<%= name %>
===========

### Project Setup

In case anyone is setting up the new project repository from the start then, this Wiki page can be used as guiding steps. https://github.com/moxienyc/moxie-wiki/wiki/Setup-New-WordPress-Theme-Project

#### Access the Project Repository

- You will be able to access the project repository from Moxie's Github Account. Ususally it will be on the name of Website URL of that particular project.
- E.g., Google Project Repo is on the name of google.com. So you would access the repo with following command.

```bash
git clone git@github.com:moxienyc/google.com.git
```

- This will clone the repository on your local machine. And you will be working within this repo.

#### Install Pre-requisites

You will need to install a few dependencies / pre-requisite development tools before you get started with the project development.

##### node.js & npm

- You'll need to download and install Node. Ref : https://nodejs.org
    - Preferably install node using nvm. It helps you maintain different versions of node. Ref : https://github.com/creationix/nvm
- You'll need to install npm (Node Package Manager)
    - Node comes with npm installed so you should have a version of npm. However, npm gets updated more frequently than Node does, so you'll want to make sure it's the latest version.

```bash
npm install npm -g
```

- Test: Run `npm -v`. The version should be higher than 2.1.8.

##### bower

```bash
# Install Bower
npm install -g bower
```

##### sass Ruby gem

```bash
gem install sass
```

If you get an error message then it's likely you will need to use the `sudo` command to install the Sass gem. It would look like:

```bash
sudo gem install sass
```

Double check by executing the command `sass -v` to know sass is installed properly.

##### Composer

```bash
# Install Composer (Ref : https://getcomposer.org/doc/00-intro.md#globally)
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```

#### Prepare Repository to use dev tools dependencies

- Go to theme directory i.e., `wp-content/themes/xyz-theme` and run following commands.

```bash
# Install node modules
npm install
```

```bash
# Install bower components
bower install
```

```bash
# Install composer dependencies
composer install
```

#### Assets Generation

##### Stylesheet CSS Generation

```bash
# Concats all the CSS into one single CSS file for the project. Also generates a minified version of the same.
gulp styles
```

##### JS Generation

```bash
# Concats all the JS files one single JS file for the project. Also generates a minified version of the same.
gulp js
```

**NOTE:**

- `gulp` : This command will run all the default tasks which are mentioned below and put it on watch. So if the source files are updated, these tasks will be executed on the go.

  - compile sass to generate css and other styles related tasks.
  - concat all the JS into one JS file and other JS related tasks
  - jsHint code scan for JS standards
  - phpcs code scan for WordPress standards

#### Follow Coding Standards

Run following commands after going to theme directory. i.e., `wp-content/themes/xyz-theme`

##### phpcs

```bash
gulp phpcs
```

- This will scans your theme code and output all the phpcs errors from the code. You should try to resolve those and commit your code.
- `phpcs` is mainly for your PHP code in the theme.

##### jsHint

```bash
gulp jsHint
```

- This will scans your theme code and output all the jsHint errors from the code. You should try to resolve those and commit your code.
- `jsHint` is mainly for your JavaScript code in the theme.

##### ci.sh script

We have also developed a CI script which we use in our Travis-CI workflow. That script also does the same thing which above two commands do togather.

If `ci.sh` is not present in the root of the repository, you can setup that script using this guidelines : https://github.com/moxienyc/generator-moxie-wp#travis-ci-setup-for-wordpress-theme-repository

**NOTE:** You can find more information about how to follow these coding standards in this wiki page : https://github.com/moxienyc/moxie-wiki/wiki/Starter-Theme-Coding-Standard-Practices

#### Deploy Process

We have developed a deploy script for all the projects. You can get help from these two guidelines on how to use deploy script with our Git Development model.

- Git Development Workflow : https://github.com/moxienyc/moxie-wiki/wiki/Git-Workflow
- Deploy Script Doc : https://github.com/moxienyc/wp-gulp-deploy/#wordpress-theme-deploy-script


