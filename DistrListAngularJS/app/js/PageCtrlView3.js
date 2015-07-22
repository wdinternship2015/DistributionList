angular.module('view3Module', []).controller('PageCtrlView3', function ($scope, shareDataService/* $location, $http */) {
	  console.log("PageCtrlView3 reporting for duty.");
	  $scope.workers = shareDataService.get();
	  $scope.workersize = $scope.workers.length;
});
