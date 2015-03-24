[$http]: https://docs.angularjs.org/api/ng/service/$http
[$resource]: https://docs.angularjs.org/api/ngResource/service/$resource


# generator-jb-angular [![Build Status](https://travis-ci.org/JLBoor/generator-jb-angular.svg)](https://travis-ci.org/JLBoor/generator-jb-angular) [![Code Climate](https://codeclimate.com/github/JLBoor/generator-jb-angular/badges/gpa.svg)](https://codeclimate.com/github/JLBoor/generator-jb-angular)

>Yeoman Generator for Enterprise Angular Projects. Forked from [cgross/generator-cg-angular](https://github.com/cgross/generator-cg-angular)

This generator follows the [Angular Best Practices](http://jlboor.github.io/angularjs/angular-best-practices-introduction/) *(Work in progress)*.


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

And finally, `grunt sample` and open [http://localhost:9001/app/#/page/company/list](http://localhost:9001/app/#/page/company/list)

Use one of the following username

    john.doe
    french
    company

### Grunt tasks
    grunt serve   #This will run a development server with watch & livereload enabled.
    grunt test    #Run local unit tests.
    grunt build   #Places a fully optimized (minified, concatenated, and more) in /dist
    grunt sample  #Same as grunt serve, but also starts the mock server on http://localhost:9002

### Generators
#### Modules
    yo jb-angular:module

#### Services
    yo jb-angular:service

- blank: generates a simple service with no content. Ideal when starting a new business service.
- $http: generate a rest service that encapsulate all the calls for a specific operation.
- $resource: same as $http, but uses the [$resource] service instead of the [$http]

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

## License

Copyright 2015 Jean-Louis Bourgeois

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
