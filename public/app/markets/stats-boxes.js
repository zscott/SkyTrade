(function () {
    var app = angular.module('markets.statsBoxes',
        [
            'auth.authSvc',
            'markets.marketSvc'
        ]);

    app.directive('marketStatsBoxes', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/markets/market-stats-boxes.html',
            controller: function ($scope, $timeout, MarketService, $log) {

                (function refresh() {
                    MarketService.getMarkets().then(function (markets) {
                        $scope.marketList = markets;
                        $timeout(refresh, 250);
                    }, function () {
                        $log.log("failed to get markets for market stats boxes");
                    });
                })();
            },
            controllerAs: 'marketCtrl'
        }
    });
})();