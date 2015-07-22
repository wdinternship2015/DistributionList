angular.module('sideBarModule').controller('sideBarCtrl', ["$scope", "$http", "tokenService", function($scope, $http,tokenService){
  $scope.submit = function(){
    tokenService.getToken().then(
      function(success){
        alert('Success: ' + success.data);

      }, 
      function(error){
        alert('Error');
 
      });

  };


}]);
