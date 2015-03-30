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
        };

        Filterable.prototype.toQuery = function() {
            var s = (this.pageNumber - 1) * this.pageSize;
            var e = s + this.pageSize;
            return { _start: s, _end: e};
        };

        Filterable.prototype.filter = function(showPage) {
            var that = this;
            if(showPage) { that.pageNumber = showPage; }

            return that.restService.list(that.toQuery()).then(function(response) {
                that.data = response;
                that.totalElements = 9; // FIXME Hardcoded for sample app
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
