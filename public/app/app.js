(function () {

    var app = angular.module('app',
        [
            'ui.router',
            'ngCookies',
            'nav.mainMenu',
            'auth.userAuth',
            'markets'
        ]);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '',
                abstract: true
            })
        ;

        $urlRouterProvider.otherwise('/');
    });

    app.constant('COOKIE_NAMES', {
        session: 'client-session-cookie',
        selectedMarket: 'selected-market'
    });

    app.controller('ApplicationController',
        ['$log', '$scope', '$state', '$cookies', 'COOKIE_NAMES', 'USER_ROLES', 'AuthService',
            function ($log, $scope, $state, $cookies, COOKIE_NAMES, USER_ROLES, AuthService) {
                $scope.currentUser = null;
                $scope.userRoles = USER_ROLES;
                $scope.isAuthorized = AuthService.isAuthorized;

                $scope.setCurrentUser = function (user) {
                    $scope.currentUser = user;
                };

                $scope.navigateToMarket = function (market) {
                    $state.go('app.markets.details', {marketSymbol:market.symbol});
                };

                var sessionId = $cookies[COOKIE_NAMES.session];
                if (sessionId && sessionId !== null && sessionId !== "null" && sessionId !== undefined) {
                    $log.log("initializing current user with session-id: " + sessionId);
                    AuthService.initUser(sessionId, $scope);
                }

            }]
    );

})();
