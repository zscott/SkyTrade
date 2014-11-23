(function () {
    var app = angular.module('markets.details',
        [

        ]);

    app.config(function($stateProvider) {
        $stateProvider
            .state('app.markets.details', {
                url: 'markets/{marketSymbol:.*}',
                views: {
                    'details@': {
                        templateUrl: 'app/markets/details/details.html',
                        controller: 'DetailsCtrl'
                    }
                }
            })
        ;
    });

    app.controller('DetailsCtrl', function ($scope, $timeout, $stateParams) {
        $scope.marketSymbol = $stateParams.marketSymbol;
    });

})();