(function () {
    var app = angular.module('markets',
        [
            'markets.statsBoxes',
            'markets.marketSvc'
        ]);

    app.config(function($stateProvider) {
        $stateProvider
            .state('app.markets', {
               url: '/',
                views: {
                    'markets@': {
                        templateUrl: 'app/markets/markets.html'
                    },
                    'details@': {
                        templateUrl: 'app/markets/details/details.html'
                    }
                }
            });
    });

})();