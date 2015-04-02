# generator-moxie-wp [![Build Status](https://travis-ci.org/moxienyc/generator-moxie-wp.svg?branch=master)](https://travis-ci.org/moxienyc/generator-moxie-wp)

> [Yeoman](http://yeoman.io) generator


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

## WP Test Data for Theme Testing

- Just run following command from anywhere in the terminal.

```bash
yo moxie-wp:wptest
```

- It will ask you for the WordPress installation path. Provide one and press enter.
    - E.g., my WordPress installation is at `/var/www/example.com/htdocs/`. That's where my WordPress index.php & wp-load.php is available. So I'll give that path as input here.
- That's it ! The tool will download the test data XML file. Install/Activate WordPress Importer plugin on your site and import all the test data to your site. This part of importing is a heavy downloading process, so it might take some time depending on your internet connection.

## How to use it locally

- `git clone https://github.com/moxienyc/generator-moxie-wp.git`
- `cd generator-moxie-wp`
- `npm link`
- Create a project folder for which you need `moxie-wp` generator. (Not within the `generator-moxie-wp` folder) i.e., `mkdir testing-out-loud && cd testing-out-loud`
- `yo moxie-wp` and see the magic.

## Roadmap
- Recess integration for CSS standardization: http://twitter.github.io/recess/
- WordPress coding standards: https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards
- PHP Code Sniffer Integration: https://github.com/squizlabs/PHP_CodeSniffer
- JSHint: http://jshint.com/
- PHPUnit for unit tests
- Editor Config: http://editorconfig.org/
- Travis CI: https://travis-ci.org/recent
- Pre-Commit hooks: http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
