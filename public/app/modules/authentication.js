(function () {
    var app = angular.module('authentication', ['ngCookies']);

    app.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        trader: 'trader',
        guest: 'guest'
    });

    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    app.factory('AuthService', ['$log', '$http', '$cookies', 'COOKIE_NAMES', 'Session', function ($log, $http, $cookies, COOKIE_NAMES, Session) {

        var getUser = function(data) {
            var user = data.user;
            return {id: user.userId, username: user.username, firstname: "Firstname", lastname: "Lastname", role: user.role};
        };

        return {
            initUser: function (sessionId, appScope) {
                $http
                    .get('/api/v1/session/' + sessionId)
                    .then(function (response) {
                        var data = response.data;
                        var user = getUser(data);

                        Session.create(data.sessionId, user.userId, user.role);
                        $cookies[COOKIE_NAMES.session] = data.sessionId;
                        appScope.setCurrentUser(user);
                        return user;
                    });
            },

            authenticate: function (credentials) {
                return $http
                    .post('/api/v1/authenticate', credentials)
                    .then(function (response) {
                        var data = response.data;
                        var user = getUser(data);

                        Session.create(data.sessionId, user.userId, user.role);
                        $cookies[COOKIE_NAMES.session] = data.sessionId;
                        return user;
                    });
            },

            terminateSession: function () {
                $http
                    .post('/api/v1/session/' + Session.id + '/terminate')
                    .then(function (response) {
                        Session.destroy();
                        $cookies[COOKIE_NAMES.session] = null;
                    });
            },

            isAuthenticated: function () {
                return !!Session.userId;
            },

            isAuthorized: function (mustBeOneOf) {
                if (!angular.isArray(mustBeOneOf)) {
                    mustBeOneOf = [mustBeOneOf];
                }
                return (this.isAuthenticated() && mustBeOneOf.indexOf(Session.userRole) !== -1);
            }
        };

    }]);

    app.service('Session', function () {

        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };

        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    });

})();