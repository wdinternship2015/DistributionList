angular.module('myDListModule').controller('groupDetailsCtrl', function($scope, shareDataService, $log) {

	$scope.thisGroup = shareDataService.getPickedGroup();
	$scope.showGroupInfo = true;

	$scope.selectedMembers = {
			//add group id?
			members :[]
	};
		
	
//make REST call onload here to get distribution lists detail of thisGroup	
	$scope.getDListDetails = function(scope)  {
		
	};
	
//make REST call to remove selectedMembers
	$scope.removeMembers = function(scope)  {
		
	};
	
	$scope.viewMemberDetails = function(aMemeber) {
		//REST call to get information of aMember
		//shareDataService.setPickedMember(aMemeber);
		//$scope.viewMember();
	};

//make REST call to remove selectedMembers
	$scope.saveGroupDetails = function(scope)  {
		$scope.showGroupInfo = ! $scope.showGroupInfo;
	};
	
	
	
});
