(function () {
    var app = angular.module('nav.mainMenu',
        [

        ]);

    app.directive('mainMenu', function() {
       return {
           restrict: 'E',
           templateUrl: '/app/nav/main-menu.html',
           controller: function () {

               this.accounts = function() {
                   alert('accounts');
               };

               return this;
           },
           controllerAs: 'menuCtrl'
       };
    });

})();