# generator-jb-angular

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
    `john.doe`
    `french`
    `companies`

## Generators
For now, the sub-generators have been disabled. Only the app generator works.

## Resources
- [cgross/generator-cg-angular](https://github.com/cgross/generator-cg-angular)
- [JSON Generator](http://www.json-generator.com/)
- [JSON Server](https://github.com/typicode/json-server)


