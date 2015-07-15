angular.module('view3Module', ['checklist-model']).controller('PageCtrlView3', function ($scope, shareDataService/* $location, $http */) {
	  console.log("PageCtrlView3 reporting for duty.");
	  $scope.workers = shareDataService.get();
	  $scope.workersize = $scope.workers.length;
	  
	  $scope.deleteWorker = {
			    workers: []
			  };
			  $scope.checkAll = function() {
			    $scope.user.roles = angular.copy($scope.roles);
			  };
			  $scope.uncheckAll = function() {
			    $scope.user.roles = [];
			  };
			  $scope.checkFirst = function() {
			    $scope.user.roles.splice(0, $scope.user.roles.length); 
			    $scope.user.roles.push($scope.roles[0]);
			  };
});