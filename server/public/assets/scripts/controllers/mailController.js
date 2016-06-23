myApp.controller('MailController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  // This happens after view/controller loads -- not ideal
  $scope.email = {};

  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/home");
      }
  });

$scope.getEmail = function () {


  $http.get('/mail/messages').then(function(response) {
        if(response.data) {

            console.log('Message Data: ', response.data);
        } else {
          console.log('error');
        }
    });
  };
  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }

  $scope.submitEmail = function () {
   console.log($scope.email);
     $http.post('/mail', $scope.email).then(function(response) {
      console.log(response);

     });
  };
}]);
