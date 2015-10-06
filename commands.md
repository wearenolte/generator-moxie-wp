## Add workflow file

To add the workflow file just run the following command and reply with:
'y'

```bash
yo moxie-wp:workflow
```

## Generate a new Behavior

To create a new behavior you need to be in the theme directory for
example: `cd wp-content/themes/Lean/`

Then you need to run:
```bash
yo moxie-wp:bh
```

That will generate a new proompt where you can set the name of the
behavior like: **instagram feed**, this will generate the
`instagram-feed.js` file in to the:

`assets/js/app/behaviors/`

Directory, also you need to have the `init.js` in to the
`assets/js/app/init.js`.

## Install wordpress files for the repo.

- To download the latest version of wordpress just run

```bash
yo moxie-wp:download
```

This command will download the latest version of WP and extract the files in the current directory.


**Note** It will install the files in the current directory, so make sure to be in the directory where you want the files

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

- The tool will place a `.travis.yml` file for [Travis-CI](travis-ci.com) integration and `ci.sh` script file which will be executed on every commit pushed to repo.

- You will need to update the `THEME_DIR` variable in `ci.sh` script according to your theme repository. E.g., if your wordpress theme path is `wp-content/themes/example` in your repository, then you will put `THEME_DIR` value as `wp-content/themes/example`.

**Note** It will place the files in the current directory, so make sure to be in the directory where you want the files

### Run the script on local to check for errors before committing

- After you run the travis sub-command to place travis related files, you will have `ci.sh` script file in the repository root.
- You can simply run that script to check for errors on your local machine. `bash ci.sh`.

***OR***

- You can run `gulp phpcs` & `gulp jshint` within your theme folder. That will also show you the errors.
- You will need to run `composer install` before you run `gulp phpcs`