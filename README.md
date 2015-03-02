# generator-moxie-wp [![Build Status](https://travis-ci.org/moxienyc/generator-moxie-wp.svg?branch=master)](https://travis-ci.org/moxienyc/generator-moxie-wp)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-moxie-wp from npm, run:

```bash
npm install -g generator-moxie-wp
```

Finally, initiate the generator:

```bash
yo moxie-wp
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT

## Roadmap
- Recess integration for CSS standardization: http://twitter.github.io/recess/
- WordPress coding standards: https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards
- PHP Code Sniffer Integration: https://github.com/squizlabs/PHP_CodeSniffer
- JSHint: http://jshint.com/
- PHPUnit for unit tests
- Editor Config: http://editorconfig.org/
- Travis CI: https://travis-ci.org/recent
- Pre-Commit hooks: http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks


## How to use it locally

- `git clone https://github.com/moxienyc/generator-moxie-wp.git`
- `cd generator-moxie-wp`
- `npm link`
- Create a project folder for which you need `moxie-wp` generator. (Not within the `generator-moxie-wp` folder) i.e., `mkdir testing-out-loud && cd testing-out-loud`
- `yo moxie-wp` and see the magic.


## WP Test Data for Theme Testing

- Just run following command from anywhere in the terminal.
- `yo moxie-wp:wptest`
- It will ask you for the WordPress installation path. Provide one and press enter.
    - E.g., my WordPress installation is at `/var/www/example.com/htdocs/`. That's where my WordPress index.php & wp-load.php is available. So I'll give that path as input here.
- That's it ! The tool will download the test data XML file. Install/Activate WordPress Importer plugin on your site and import all the test data to your site. This part of importing is a heavy downloading process, so it might take some time depending on your internet connection.