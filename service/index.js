'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {

    cgUtils.getNameArg(this,args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ServiceGenerator, yeoman.generators.Base);



ServiceGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [{
            name: 'serviceType',
            message: 'Which type of service would you like to create?',
            type: 'list',
            choices: ['blank', '$resource', '$http'],
            default: 0
        },
        {
            name:'name',
            default: 'myService',
            message: 'Enter a name for the service.',
            when: function(response) { return response.serviceType === 'blank'; }
        },
        {
            name: 'entityName',
            default: 'myEntity',
            message: 'What is the name of your entity?',
            type: 'input',
            when: function(response) {
                return response.serviceType === '$resource' || response.serviceType === '$http';
            }
        },
        {
            name: 'restOperation',
            default: function(response) {return '/' + that._.dasherize(response.entityName) + 's'; },
            message: 'What is the name of your entity?',
            type: 'input',
            when: function(response) { return response.entityName; }
        }];

    this.prompt(prompts, function (props) {
        if (props.name){ this.name = props.name; }

        if (props.serviceType) { this.serviceType = props.serviceType; }
        if (props.entityName) { this.entityName = props.entityName; this.name = this.entityName + 'RestService'; }
        if (props.restOperation) { this.restOperation = props.restOperation; }

        cgUtils.askForModuleAndDir('',this,false,cb);
    }.bind(this));

};

ServiceGenerator.prototype.files = function files() {

    var templateDir = null;

    if(this.serviceType === '$resource') { templateDir = 'templates-rest/resource'; }
    if(this.serviceType === '$http') { templateDir = 'templates-rest/http'; }

    cgUtils.processTemplates(this.name,this.dir,'serviceName',this,templateDir,null,this.module);

};
