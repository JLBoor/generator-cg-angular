angular.module('components.filterable', ['ui.bootstrap.pagination'])

    .directive('filterablePageNav', function() {
        return {
            restrict: 'E',
            scope: {'filterable': '=ngModel'},
            templateUrl: 'modules/components/filterable/filterable-page-nav.html'
        };
    })

    .constant('filterableConstants', {
        pageSize: 10
    })

    .service('filterableService', function(filterableConstants) {

        var Filterable = function(service, pageable) {
            this.restService = service;
            this.pageNumber = 1;                            // default first page
            this.pageSize = filterableConstants.pageSize;   // default record per page
            this.orderByProperty = null;
            this.filterParamns = {};
        };

        Filterable.prototype.setOrderByProperty = function(orderBy) {
            this.orderByProperty = orderBy;
        };

        Filterable.prototype.toQuery = function() {
            var s = (this.pageNumber - 1) * this.pageSize;
            var e = s + this.pageSize;

            this.filterParamns._start = s;
            this.filterParamns._end = e;
            this.filterParamns._orderBy = this.orderByProperty;

            return this.filterParamns;
        };

        Filterable.prototype.filter = function(showPage) {
            var that = this;
            if(showPage) { that.pageNumber = showPage; }

            return that.restService.list(that.toQuery()).then(function(response) {
                that.data = response.elements;
                if (response._metadata) {
                    that.totalElements = response._metadata.totalElements;
                }

                return that;
            });
        };

        /**
         * Creates a new filterable wrapper around the restService
         * @param restService
         * @param fullCollection
         * @returns {Filterable}
         */
        this.makeFilterable = function(restService, pageable) { return new Filterable(restService, pageable); };

    });
