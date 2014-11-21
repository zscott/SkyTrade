(function () {
    var app = angular.module('markets', []);

    app.factory('MarketService', ['$log', '$http', function ($log, $http) {

        return {
            getMarkets: function () {
                return $http
                    .get('/api/v1/markets')
                    .then(function (response) {
                        return response.data;
                    });
            }
        };

    }]);

})();