(function () {
    var app = angular.module('directives',
        [
            'auth.authSvc',
            'markets'
        ]);

    app.directive('marketStatsBoxes', function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/market-stats-boxes.html',
            controller: function ($scope, $timeout, MarketService, $log) {

                $scope.marketList = [];

                (function refresh() {
                    MarketService.getMarkets().then(function (markets) {
                        $scope.marketList = markets;
                        $timeout(refresh, 5000);
                    }, function () {
                        $log.log("failed to get markets for market stats boxes");
                    });
                })();
            },
            controllerAs: 'marketCtrl'
        }
    });

    app.directive('mainMenu', function() {
       return {
           restrict: 'E',
           templateUrl: '/templates/main-menu.html',
           controller: function ($scope, $rootScope, AUTH_EVENTS, $log) {

               this.accounts = function() {
                   alert('accounts');
               };

               return this;
           },
           controllerAs: 'menuCtrl'
       };
    });

})();