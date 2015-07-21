angular.module('ownedByMeModule', [ 'checklist-model' ]).controller('ownedByMeCtrl', function($scope, shareDataService, $log) {
	console.log("ownedByMeCtrl reporting for duty.");

	$scope.groups = testGroups;
	$scope.datasize = $scope.groups.length;
	
	$scope.showDetails = false;
	$scope.showCreateNewGroup = false;
	
	shareDataService.set($scope.groups);

	$scope.deleteGroup = {

	};
	
	$scope.newGroup = function(scope) {
		$scope.showCreateNewGroup = true;
		$scope.isPrivate = false;
//		$scope.resetNewGroupForm();
//		$scope.aGroup.visibility = "";

	};

	
	$scope.addNewGroup = function(scope) {

		$scope.aGroup.id = $scope.aGroup.name;		
		var tempGroup = JSON.stringify($scope.aGroup);

		$scope.groups.push(JSON.parse(tempGroup));
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
	

});











var testGroups = [{"id": "007", "name": "test name", "alias": "test alias", "description": "test description", "visibility": "Public"}];