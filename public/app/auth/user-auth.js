(function () {
    var app = angular.module('auth.userAuth',
        [
            'auth.authSvc',
            'markets'
        ]);

    app.directive('userAuth', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/auth/user-auth.html',
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
})();
