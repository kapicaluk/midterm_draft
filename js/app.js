var app = angular.module('myApp', ['ngRoute', 'trailControllers','firebase'])
.constant('FIREBASE_URL', 'https://trailbase.firebaseio.com/');

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/list',{
        templateUrl: 'partials/list.html',
        controller: 'ListController'
    })
    .when('/login',{
        templateUrl: 'partials/login.html',
        controller: 'registration'
    })
    .when('/register',{
        templateUrl: 'partials/register.html',
        controller: 'registration'
    })
    .when('/newtrail',{
        templateUrl: 'partials/newtrail.html',
        controller: 'ListController'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);
