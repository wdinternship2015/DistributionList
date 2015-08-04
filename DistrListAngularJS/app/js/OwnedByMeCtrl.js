angular.module('myDListModule').controller('ownedByMeCtrl', function($scope, shareDataService, $log, $localStorage) {
	//$scope.$storage.token
	$scope.showDetails = false;
	$scope.showCreateNewGroup = false;
	
	console.log("ownedByMeCtrl reporting for duty. token: " + $scope.token);
	$scope.groups = testGroups;
	$scope.datasize = $scope.groups.length;
	shareDataService.set($scope.groups);
	var formValidated = false;

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
		formValidated = false;
	};

	
	$scope.addNewGroup = function(scope) {
		$scope.validName = ! $scope.aGroup.name || ! $scope.aGroup.name.length > 0;
		$scope.validAlias = ! $scope.aGroup.alias || ! $scope.aGroup.alias.length > 0;
		$scope.validDescrpt = ! $scope.aGroup.description || ! $scope.aGroup.description.length > 0;
		formValidated = !($scope.validName || $scope.validAlias || $scope.validDescrpt);
		
		if (formValidated) {
			
			var temp = {};
			temp["name"] = $scope.aGroup.name;
			temp["alias"] = $scope.aGroup.alias;
			temp["private"] = $scope.aGroup.private;
			temp["description"] = $scope.aGroup.description;
			temp["managedBy"] = '[{"id":"247$257"}]';

			$scope.groups.push(temp);			
			//REST call go here to submit form 
			
			$scope.resetNewGroupForm();
			$scope.showCreateNewGroup = ! $scope.showCreateNewGroup;
		}
	};
	
	$scope.resetNewGroupForm = function(scope) {
		if ($scope.aGroup){
		$scope.aGroup.name = "";
		$scope.aGroup.alias = "";
		$scope.aGroup.description = "";
		$scope.validName = false;
		$scope.validAlias = false;
		$scope.validDescrpt = false;
		formValidated = false;
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