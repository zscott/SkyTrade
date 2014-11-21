(function () {
    var app = angular.module('market.statsBoxes',
        [
            'auth.authSvc',
            'market.marketSvc'
        ]);

    app.directive('marketStatsBoxes', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/market/market-stats-boxes.html',
            controller: function ($scope, $timeout, MarketService, $log) {

                $scope.marketList = [];

                (function refresh() {
                    MarketService.getMarkets().then(function (markets) {
                        $scope.marketList = markets;
                        $timeout(refresh, 1000);
                    }, function () {
                        $log.log("failed to get markets for market stats boxes");
                    });
                })();
            },
            controllerAs: 'marketCtrl'
        }
    });
})();