var myApp = angular.module('myApp', ['ngRoute']);
/// Routes ///

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController"
    })
    .when('/mail', {
      templateUrl: '/views/mail.html',
      controller: "MailController"
    })
    .when('/messages', {
      templateUrl: '/views/messages.html',
      controller: "MessagesController"
    })
    .otherwise({
      redirectTo: 'home'
    })
}]);
