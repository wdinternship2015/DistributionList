angular.module('myDListModule').controller('myListViewCtrl', function($scope, shareDataService, $log) {
	var pressed = "#66d9ff";
	var released = "#007399";
	document.getElementById("ownedByMeBtn").style.background = pressed;
	document.getElementById("memberOfBtn").style.background = released;
		
	  $scope.ownedByMe = function() {
		$scope.contentUrl = 'partials/ownedByMe.html';
		document.getElementById("ownedByMeBtn").style.background = pressed;
		document.getElementById("memberOfBtn").style.background = released;
	  }
	  
	  $scope.memberOf = function() {
		$scope.contentUrl = 'partials/memberOf.html';
		document.getElementById("ownedByMeBtn").style.background = released;
		document.getElementById("memberOfBtn").style.background = pressed;
	  }	
	  $scope.manageGroup = function() {
			$scope.contentUrl = 'partials/groupDetails.html';
		 }

});
