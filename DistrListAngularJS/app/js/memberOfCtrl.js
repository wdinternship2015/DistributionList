angular.module('myDListModule').controller('memberOfCtrl', function ($scope, shareDataService, $log) {
	  console.log("memberOfCtrl reporting for duty.");
	  
	  $scope.memberOfGroups = shareDataService.get();
	  
//make REST call onload here to get distribution lists I am a member of	
	$scope.getMemberOfGroups = function(scope)  {
		
	};
	  
// make REST call to delete selectedGroups
	$scope.unsubscribeFromGroups = function(scope)  {
		
	};
	
	$scope.selectedGroups = {
		// add user id?
		groups :[]
	};

});






















