# Middleman/Grunt Boilerplate

[Middleman](https://middlemanapp.com/) based site boilerplate incorporating Grunt.

## Deployment Pipeline

Use this README as your projects template and include deployment instructions here.

## Dependencies

### Ruby

Currently using Ruby 2.1.2. If Ruby isn't installed on your machine, it is recommended to use [RVM](http://rvm.io/rvm/install) (Ruby Version Manager) or [rbenv](https://github.com/rbenv/rbenv) to manage your Ruby versions.

### Bundler

This boilerplate expects its gems to be managed via [Bundler](http://bundler.io/) so you will need to ensure it has been installed first. If you've just installed Ruby, install this gem via a command line:

```bash
$ gem install bundler
```

### Middleman

Middleman is a static site generator. To install:

```bash
$ gem install middleman
```

### Node

Currently the boilerplate uses Node for local development scripting and asset compilation. The easiest way to get Node running on your location machine and manage Node versions is to use [Node Version Manager (nvm)](https://github.com/creationix/nvm). If you are developing on a Mac, the easiest way to install nvm is to use [Homebrew](http://brew.sh/):

```bash
$ brew install nvm
```

Then install the current version of Node with nvm and tell nvm to use the installed version as your default Node version:

```bash
$ nvm install v5.0.0
$ nvm alias default 5.0.0
```

### Node with Grunt

This boilerplate is running a [Node](https://nodejs.org/) server during dev and uses [Grunt](http://gruntjs.com/) to build assets and work with [BrowserSync](http://browsersync.io/) for CSS injection and page updates.

```bash
$ npm install
```

### Grunt

Grunt is used to handle all javascript, CSS, fonts, and image assets. This also includes updating the compiled HTML files with the new paths to hashed files.

**SCSS**

Grunt is using SCSS globbing to automatically include any SCSS files in the `source/css/sass/base`, `source/css/sass/helpers` and `source/css/sass/layout` folders. Just prefix file names with an underscore.

Postcss with autoprefixer is also included.

**JS**

This boilerplate includes Browserify/Babel with ES6 support. Add any extra plugins like React support to the Browserify task.

## Setup

After cloning the project to your machine, `cd` into the project and run `npm install` (this will also fire a postinstall `bundle install` command):

```bash
$ cd dt-marketing
$ npm install
```

In your project root, create a `.env` file with the appropriate contents.

To start the development server, simply type:

```
$ npm start
```

## Build and Deploy

### Ignoring the things that don't stand alone

Everything in the source directory will be built by Middleman and Grunt. When the file doesn't need to exist as a page in the build, please add the appropriate ignore rules to the build block in the config file. Some examples of this are the entire content and partial directories (their files are processed in the build, thus they don't need to exist as individual pages in the resulting site). Check out the build block in `config.rb` for examples.

### Local Build

Building locally can sometimes be useful to test configuration output, upload to another phase in the pipeline, etc.

To build the files locally you can simply run:

```bash
$ npm run build
```

### Production Server

Use this README as your projects template and include production environment instructions here.
