(function () {

    var app = angular.module('falcon',
        [
            'ui.router',
            'ngCookies',
            'nav.mainMenu',
            'auth.userAuth',
            'market.statsBoxes'
        ]);

    app.config(function($stateProvider) {
        $stateProvider
            .state('home', {
                url:'/',
                templateUrl: 'app/home.html'
            })
        ;
    });

    app.constant('COOKIE_NAMES', {
        session: 'client-session-cookie',
        selectedMarket: 'selected-market'
    });

    app.controller('ApplicationController',
        ['$log', '$scope', '$cookies', 'COOKIE_NAMES', 'USER_ROLES', 'AuthService',
            function ($log, $scope, $cookies, COOKIE_NAMES, USER_ROLES, AuthService) {
            $scope.currentUser = null;
            $scope.userRoles = USER_ROLES;
            $scope.isAuthorized = AuthService.isAuthorized;

            $scope.setCurrentUser = function (user) {
                $scope.currentUser = user;
            };

            var sessionId = $cookies[COOKIE_NAMES.session];
            if (sessionId && sessionId !== null && sessionId !== "null" && sessionId !== undefined) {
                $log.log("initializing current user with session-id: " + sessionId);
                AuthService.initUser(sessionId, $scope);
            }
        }]
    );

})();
