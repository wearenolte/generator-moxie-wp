## To get setup locally follow these steps

This is useful when you want to set up a local repo based on a url of a repository for this you need: 

1. The url of the repo like: `git@github.com:moxienyc/proyectB.git`.
2. The name of the theme: ProyectB in this case, the name must match the same as the one inside of `wp-content/themes/ProyectB`.

Create a new directory for your local project: 

```
mkdir myLocalProyectB
```

Move into the location of that new local project:

```
cd myLocalProyectB
```

Run the following command: 

```
yo moxie-wp:install
```

This will ask two questions, answer with the information from the previous points, take a look at the screen shot.


![ScreenShot](https://cdn.rawgit.com/moxienyc/generator-moxie-wp/a6b488e97a9a78e0da4da9bfc7031605bac6b20a/captures/install.png)


This will do:  

1. Download wordpress in the current directory
2. Install node dependencies
3. Install bower dependencies
4. Install composer dependencies


Once this is complete you are ready to go, just need to update your Wordpress configuration frmo the `wp-config.php` file or directly from the browser.

**Note** This does not build the assets, in the theme because may be different in other themes. So make sure to build the assets, sometimes this can be done with: `gulp js && gulp styles`. 


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
