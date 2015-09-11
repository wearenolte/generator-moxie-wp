# Workflow 

1. Repository
2. Communications
3. Local Set up
4. Environments
5. Deployment

## Repository

**Theme code**

Each project has a repo associate with itself you can fin the the code in the [Moxie account](https://github.com/moxienyc/). If you don't have access to the repo, please ask on the chat room. 

In the repo you will find the code to install the theme of the site, generally we only storage the code  of `.php, .scss, .js` files, other files are generated with build system like `gulp or grunt`. (So if you don't find the style or script of a site please make sure to run this build systems first).

## Communications

**HipChat**

As well as the repo each project has a custom room in `hipchat`, please make sure to handle all type of conversation about the project under the chat room of the project only. 

**Questions than involve code**

If you have questions about implementation, features or any feature than involves code, please create a new issue in the repo with the `question` label, in that way we can keep track of the project much better.


## Environments 

All sites has 2 environments over we write code: 

a. **Staging**: This environment represents one step before the live site, where we push changes or new features before we move forward with the implementation on the live site, so the clients and the development team can see the results and test before we merge the changes from this environment to the live site.
b. **Production**: This environment represent the live site, and it's the version that everywhere can see as the final version of the site.

### Basic structure of the repo

On each repository, we have at least 2 branches:

a. **master**: this is the stable version of the site, this branch handles only merges from hotfix or develop branch, changes shouldn't be commited in this branch. All changes need to be tested on **staging** before merge those changes in this branch. And this branch it's mapped to the *production environment*.
b. **develop**: This branch it's mapped to the *staging enviroment*,  this branch handles all new features and it's where we test new features or any request from the client, before we move into *production environment*. 

## Deployment

The deployment process is done via [deploybot](https://moxie.deploybot.com/), if you don't have an account please ask to provide access.

The process has 2 types of deployments

a. Automatic.
b. Manual.


### Manual deploy from master branch

All the code from master it's manually deploy via [deploybot](https://moxie.deploybot.com/), so every change published to master needs to be manually triggered from dashboard of [deploybot](https://moxie.deploybot.com/). 

This process is to ensure we don't deploy any undesired change to production environment. 

### Automatic deploy from develop branch

Any change pushed to this branch it's automatic deployed to the staging environment you should see the notification on the room of the project, or directly into [deploybot dashboard](https://moxie.deploybot.com/).
