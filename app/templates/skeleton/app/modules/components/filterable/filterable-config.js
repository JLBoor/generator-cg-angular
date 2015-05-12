angular.module('components.filterable', ['ui.bootstrap.pagination'])

    .directive('filterablePageNav', function() {
        return {
            restrict: 'E',
            scope: {'filterable': '=ngModel'},
            templateUrl: 'modules/components/filterable/filterable-page-nav.html'
        };
    })

    .constant('filterableConstants', {
        pageSize: 10,
        rotate: false, // if 'true', current page is displayed in the middle of the page list
        maxSize: null,      // maximum number of individual page links to show (ellipses will show if rotate = 'false')
        boundaryLinks: true,  // show first/last buttons
        directionLinks: true  // show next/previous buttons
    })

    .service('filterableService', function(filterableConstants) {

        var Filterable = function(service, pageable) {
            this.restService = service;
            this.pageNumber = 1;                            // default first page
            this.pageSize = filterableConstants.pageSize;   // default record per page
            this.rotate = filterableConstants.rotate;
            this.maxSize = filterableConstants.maxSize;
            this.boundaryLinks = filterableConstants.boundaryLinks;
            this.directionLinks = filterableConstants.directionLinks;
            this.orderByProperty = null;
            this.isAscending = true;
            this.filterParams = {};
        };

        Filterable.prototype.applyOrderByProperty = function(orderBy) {
            if (this.orderByProperty === orderBy) {
                this.isAscending = !this.isAscending;
            } else {
                this.isAscending = true;
                this.orderByProperty = orderBy;            
            }
        };

        Filterable.prototype.isOrderedBy = function(orderBy) {
            return this.orderByProperty === orderBy;
        };

        Filterable.prototype.isAscending = function() {
            return this.isAscending;
        };

        Filterable.prototype.toQuery = function() {

            this.filterParams._pageNumber = this.pageNumber;
            this.filterParams._pageSize = this.pageSize;
            this.filterParams._orderBy = this.orderByProperty;
            this.filterParams._ascending = this.isAscending;

            return this.filterParams;
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
