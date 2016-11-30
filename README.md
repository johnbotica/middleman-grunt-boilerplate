# Middleman Grunt Boilerplate

[Middleman](https://middlemanapp.com/) based site boilerplate incorporating Grunt. Use this README as your projects template and include deployment instructions here.

## Documentation

Documentation for use of various portions of this website are located contextually near their related files in the code source. You can simply browse the project source and most folders where it makes sense will have a `README.md` to document the intent of the files in that folder. A table of contents is listed below for convenience:

* [Data](./data)
* [Helpers](./helpers)
* [The `source` folder](./source)

## Technology

### Ruby

This project uses [Middleman](https://middlemanapp.com) as a static site generator for development. Middleman requires Ruby to operate. It is recommended that you manage your Ruby versions using [RVM](https://rvm.io/) or [rbenv](https://github.com/rbenv/rbenv). This project includes a `.ruby-version` file to specify the required version of Ruby. RVM and rbenv (with the [ruby-build](https://github.com/rbenv/ruby-build) plugin) will read this file automatically when entering the project folder and switch to the appropriate version of Ruby.

#### Bundler

[Bundler](http://bundler.io/) is used for Ruby gem dependency management. Be sure to install this before [setting up](#setup).

### Node and NPM

This project relies on [NPM](https://www.npmjs.com/), the Node Package Manager, for static asset dependency management and project operation scripts. It is recommended that you use a service such as [nvm](https://github.com/creationix/nvm) to manage multiple versions of Node on your machine. This project includes a `.node-version` file to specify the required version of Node. [avn](https://github.com/wbyoung/avn) will read this file automatically when entering the project folder and switch to the appropriate version of Node.

This project is also compatible with the new, optimized, package manager [Yarn](https://yarnpkg.com/) created by Google and Facebook if you wish to use this to speed up build and install times.

### Middleman 4

This project uses [Middleman](https://middlemanapp.com/) for prototype dev. Middleman provides easy to use, Ruby powered, template support. Since its Ruby based you can also include any relevant gem to add a little more power to your project. Check out the [Middleman Docs](https://middlemanapp.com/basics/install/) for more information.

### Grunt

This project uses [Grunt](http://gruntjs.com/) internally for task running such as SASS compiling, asset fingerprinting for cache busting, etc.

### Nginx Web Server

This project is enabled for deployment on a Heroku server and configured for service using their PHP buildpack, which includes an Nginx server. You can customize the Nginx configuration of this site when hosted there by modifying settings in the [`nginx.conf`](./nginx.conf) in the root.

**NOTE:** When you are ready to deploy this project to production do not forget to comment out the password protection rule [in the `nginx.conf` file](./nginx.conf#L29) so the public can view the website:

```nginx
# Comment these lines out when serving the site publicly
location / {
  auth_basic           "Restricted";
  auth_basic_user_file /app/.htpasswd;
}
```

## Setup

Getting setup is fairly simple once you've got Node, Ruby, and Bundler running on your machine. Simply run the install script:

```sh
$ npm install
```

This will install all Node and Ruby dependencies (internally after installing all NPM dependencies `bundle install` is executed to install Ruby dependencies). NOTE: At the time of this writing Yarn does not automatically run the `postinstall` NPM script so you must also run `bundle install` if you choose to use Yarn.

## Running

This project uses a trio of local servers to make local development easy:

* A simple Node server to deliver static assets
* The Middleman web server to serve page content and handle routing
* A BrowserSync server to handle asset injection for real time reflection of changes in your browser. This will open the local web server in your browser automatically when the `start` command is run.

Starting this up is simple by simply running:

```sh
$ npm start
```

## Code Preferences

### JavaScript

`source/js/main.js` is the primary manifest file for loading all JavaScript dependencies. This project includes [Browserify](http://browserify.org/) in the JavaScript build pipeline so you can take advantage of CommonJS module organization. [Babelify](https://github.com/babel/babelify) with the [ES2015 plugin](http://babeljs.io/docs/plugins/preset-es2015/) are also included so you can write your JavaScript using the latest ES2015 techniques and it will be compiled to compatible ES5 syntax for use in all browsers. Be advised that you will still need to include polyfills for ES2015's new Classes (such as `Promise`, `Map`, and `Set`)

### CSS/SASS

`source/css/sass/style.scss` is the primary SASS manifest file for all CSS. This project uses [SASS](http://sass-lang.com/) for easy CSS authoring. [Bootstrap 4](http://v4-alpha.getbootstrap.com/) is being used as the grid framework.

## Building

You can build this project locally by running:

```sh
$ npm run build
```

This will execute the Middleman build process and generate static files in the `/www` folder. After Middleman's build is complete, `grunt build` will be executed to compile, compress, and fingerprint all static assets, updating the Middleman built HTML files with corrected filename references to match the fingerprinted versions.

## Hosting on Github Pages

This project is configured to use Github Pages by default for file service and includes an easy to use deployment script to publish changes. Simply run:

```sh
$ npm run deploy
```

This will build the project and use the [`gh-pages`](https://github.com/tschaub/gh-pages) NPM module to `push` the contents of the built project to the `gh-pages` branch for Github to serve.

**NOTE:** This project is configured to assume service from a root folder by default. Until a `CNAME` has been specified to a Github Pages hosted project it will be served from a sub-folder. To ensure paths can be properly assigned to asset paths on build you should specify an `ASSET_HOST` environment variable locally for the deployment build process. You can set this in a `.env` file in the root of this project. For example:

```bash
# /.env
ASSET_HOST=digital-telepathy.github.io/middleman-grunt-boilerplate
```

This local environment variable will not affect deployments to Heroku as the project is built remotely when hosted on Heroku.

## Hosting on Heroku

This project is configured to be deployable to a Heroku application where you can take advantage of web-server enabled features such as password protection, 301 redirects, reverse-proxies, etc.

### Configuring your Heroku application

Get a Heroku account setup if you don't have one already and create a new Heroku application:

```sh
$ heroku create
```

Configure the correct buildpacks for the project. As this project uses multiple technologies for various purposes it takes advantage of multiple buildpacks. These buildpacks must be run in a certain order to ensure the underlying technologies are installed and available for use in each build step. You **must** specify buildpacks manually first in the exact order listed since at this time, Heroku will _not_ follow the buildback order specified in the `app.json` file:

```sh
$ heroku buildpacks:add heroku/nodejs
$ heroku buildpacks:add heroku/ruby
$ heroku buildpacks:add heroku/php
```

### Pushing to Heroku

Simply run the `deploy:heroku` npm script to deploy to Heroku and ensure the necessary build process is configured:

```sh
$ npm run deploy:heroku
```

This will push to Heroku and execute the following:

1. Update the Middleman build
1. Fingerprint assets
1. Enable basic auth to protect the staging environment
1. Enable the `robots.txt` file to prevent accidental crawling

### Staging Credentials

Basic HTTP authentication is enabled when deploying to Heroku. You can update the username password in the [`.htpasswd` file in the root](./.htpasswd). Generate a new password for your project using one of the many [htpasswd generators](http://www.htaccesstools.com/htpasswd-generator/) on the web.

Username | Password
--------- | ---------
`foobar` | `shirt world bear taken`
