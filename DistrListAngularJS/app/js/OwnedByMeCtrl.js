angular.module('myDListModule').controller('ownedByMeCtrl', function($scope, shareDataService, $log) {
	
	$scope.showDetails = false;
	$scope.showCreateNewGroup = false;
	
	console.log("ownedByMeCtrl reporting for duty.");
	$scope.groups = testGroups;
	$scope.datasize = $scope.groups.length;
	shareDataService.set($scope.groups);

//make REST call onload here to get distribution lists owned by me	
	$scope.getOwnedByMeGroups = function(scope)  {
		
	};
	
//make REST call to delete selectedGroups
	$scope.deleteMyGroups = function(scope)  {
		
	};
	
	$scope.selectedGroups = {
		//add user id?
		groups :[]
	};
	  
	$scope.newGroup = function(scope) {
		$scope.showCreateNewGroup = true;
		$scope.isPrivate = false;
	};

	
	$scope.addNewGroup = function(scope) {
		$scope.aGroup.id = $scope.aGroup.name;		
		var tempGroup = JSON.stringify($scope.aGroup);
		$scope.groups.push(JSON.parse(tempGroup));
		
		//REST call go here to submit form 
		
		$scope.resetNewGroupForm();
		$scope.showCreateNewGroup = ! $scope.showCreateNewGroup;
		
	};
	
	$scope.resetNewGroupForm = function(scope) {
		if ($scope.aGroup){
		$scope.aGroup.name = "";
		$scope.aGroup.alias = "";
		$scope.aGroup.description = "";
		$scope.isPrivate = false;
		}
	};
	
	$scope.cancelAddNewGroup = function(scope) {
		if (! $scope.aGroup) {
			$scope.showCreateNewGroup = ! $scope.showCreateNewGroup;				
			return;
		}
		$scope.resetNewGroupForm();
		$scope.showCreateNewGroup = ! $scope.showCreateNewGroup;				
	};
	
	$scope.editGroupDetails = function(aGroup) {
		//REST call to get information by aGroup.id
		shareDataService.setPickedGroup(aGroup);
		$scope.manageGroup();
	};

});











var testGroups = [{"id": "007", "name": "test name", "alias": "test alias", "description": "test description", "visibility": "Public", "members": [{"name":"Alice", "org": "WD Alice"}, {"name":"Bob", "org": "WD Bob"}, {"name":"Charlie", "org": "WD Charlie"}, {"name":"Dilbert", "org": "WD Dilbert"}]}];