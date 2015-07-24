angular.module('myDListModule').controller('myListViewCtrl', function($scope, shareDataService, $log) {
	
	  $scope.ownedByMe = function() {
		$scope.contentUrl = 'partials/ownedByMe.html';
		document.getElementById("testButton").style.color = "blue";
	  }
	  
	  $scope.memberOf = function() {
		$scope.contentUrl = 'partials/memberOf.html';
	  }	
	  $scope.manageGroup = function() {
			$scope.contentUrl = 'partials/groupDetails.html';
		 }

});
