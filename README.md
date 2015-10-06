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

Now you should have the generator available, and you can use any of the available commands. Learn more about the default generator in the [commands](https://github.com/moxienyc/generator-moxie-wp/blob/master/commands.md) file.

## Commands available

To learn more about all the [available commands](https://github.com/moxienyc/generator-moxie-wp/blob/master/commands.md) take a look at the [commands file](https://github.com/moxienyc/generator-moxie-wp/blob/master/commands.md).


## How to work with the generator locally

- `git clone https://github.com/moxienyc/generator-moxie-wp.git`
- `cd generator-moxie-wp`
- `npm link`
- Create a project folder for which you need `moxie-wp` generator. (Not within the `generator-moxie-wp` folder) i.e., `mkdir testing-out-loud && cd testing-out-loud`
- `yo moxie-wp` and see the magic.


## Pre-requisites

You can learn more about the pre-requisites of the [Lean theme in the official repo](https://github.com/moxienyc/Moxie-Lean#requirements).


## Roadmap

- WordPress coding standards: https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards
- PHP Code Sniffer Integration: https://github.com/squizlabs/PHP_CodeSniffer
- PHPUnit for unit tests
- Travis CI: https://travis-ci.org/recent
- Pre-Commit hooks: http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
