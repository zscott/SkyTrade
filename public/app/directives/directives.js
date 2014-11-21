(function () {
    var app = angular.module('directives', ['authentication', 'markets']);

    app.directive('userAuthenticator', function () {
        return {
            restrict: 'E',
            templateUrl: '/templates/user-authenticator.html',
            controller: function ($scope, $rootScope, AuthService, AUTH_EVENTS, $log) {

                this.creds = {};

                var ctrl = this;

                this.authenticate = function () {
                    $log.log("authenticating user: " + this.creds.username);

                    AuthService.authenticate(this.creds).then(function (user) {
                        $log.log("authentication successful");
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        $scope.setCurrentUser(user);
                        ctrl.creds = {};
                    }, function () {
                        $log.log("authentication failed");
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    });
                };

                this.terminateSession = function () {
                    $log.log("terminating user session");
                    AuthService.terminateSession();
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                    $scope.setCurrentUser(null);
                };

                return this;
            },
            controllerAs: 'authCtrl'
        }
    });

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