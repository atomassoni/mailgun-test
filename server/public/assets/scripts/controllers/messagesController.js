myApp.controller('MessagesController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
$scope.response = '';
$scope.message = '';


  $http.get('/messages').then(function(response) {
    $scope.reponse = response.data;
  });

}]);
