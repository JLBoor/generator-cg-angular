# generator-jb-angular [![Build Status](https://travis-ci.org/JLBoor/generator-jb-angular.svg)](https://travis-ci.org/JLBoor/generator-jb-angular)

>Yeoman Generator for Enterprise Angular Projects. Forked from [cgross/generator-cg-angular](https://github.com/cgross/generator-cg-angular)

This generator follows the [Angular Best Practices](http://jlboor.github.io/angularjs/angular-best-practices-introduction/).


## Getting Started

**Prerequisites:** Node, Grunt, Yeoman, and Bower.

Once Node is installed, do:

    npm install -g grunt-cli yo bower


**Create a project:**

First, clone this repository *(this step will go away as soon as we are on bower)*

    git clone git@github.com:JLBoor/generator-jb-angular.git
    cd generator-jb-angular
    npm link

Then create your awesome app:

    mkdir MyNewAwesomeApp
    cd MyNewAwesomeApp
    yo jb-angular

And finally, `grunt sample` and open [http://localhost:9001/app/#/page/companies/list](http://localhost:9001/app/#/page/companies/list)

Use one of the following username

    john.doe
    french
    companies

### Grunt tasks
    grunt serve   #This will run a development server with watch & livereload enabled.
    grunt test    #Run local unit tests.
    grunt build   #Places a fully optimized (minified, concatenated, and more) in /dist
    grunt sample  #Same as grunt serve, but also starts the mock server on http://localhost:9002

### Generators
For now, all the sub-generators have been disabled. Only the app generator works.

## Code structure
    app/................................... app folder
      i18n/................................ locales folder
        locale-en.json.....................
        locale-fr.json.....................
      less/................................ your styles go here
        app.less...........................
        nav.less...........................
      css/................................. generated CSS folder
        app.css............................
        nav.css............................
      modules/............................. modules folder
        moduleA/........................... example of a module
          _tests/.......................... unit tests folder
            moduleA-rest.spec.js...........
            moduleA-controller.spec.js.....
          partial/......................... partials folder
            partial1.html..................
          moduleA-config.js................ moduleA config (init, routes, ...)
          moduleA-controller.spec.js....... moduleA controller
          moduleA-rest-service.js.......... moduleA rest rest
      app.js............................... angular app initialization
      index.html........................... main HTML file

### Principles
**TODO**

## Resources
- [cgross/generator-cg-angular](https://github.com/cgross/generator-cg-angular)
- [JSON Generator](http://www.json-generator.com/)
- [JSON Server](https://github.com/typicode/json-server)


