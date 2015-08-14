angular.module('myDListModule').controller('ownedByMeCtrl', function($scope, shareDataService,requestService, $log, $modal, $confirm/*, $localStorage*/) {
	//$scope.$storage.token
	$scope.showDetails = false;
	$scope.showCreateNewGroup = false;
	$scope.addGroupFail = false;
	
//	console.log("ownedByMeCtrl reporting for duty. token: " + $scope.token);
	var formValidated = false;

//make REST call here to get distribution lists owned by me, still using get all lists
	$scope.getOwnedByMeGroups = function(scope)  {
		console.log("get list");
		requestService.searchByOwners($scope.userId, $scope.token).then(
				function(success) {
					var obj = JSON.parse(success.data);
					$scope.ownedByMeGroups = obj.data;
				//	console.log("success.data.data: " + $scope.ownedByMeGroups);
				}, 
			      function(error){
					console.log("error: " + error.data);
			    }
		);
	};
	
//make REST call to delete selectedGroups
	$scope.deleteMyGroups = function(scope)  {
		if ($scope.selectedGroups.groups.length < 1) {
			return;
		}
		console.log("groups to delete: " + $scope.selectedGroups.groups.length);
		var msg="";
		angular.forEach($scope.selectedGroups.groups, function(item) {
			msg += item.descriptor + ',   \n';
		});
		console.log("msg: " + msg);
		$confirm({text: msg, title: 'Delete ' + $scope.selectedGroups.groups.length + ' groups?', ok: 'Delete', cancel: 'Cancel'})
        .then(function() {
        	angular.forEach($scope.selectedGroups.groups, function(item) {
        		requestService.deleteDList(item.id, $scope.token).then(
    				function(success) {
    					console.log(success.data);
    		        	$scope.getOwnedByMeGroups();
    				}, 
    			      function(error){
    					console.log("error deleting: " + item.descriptor);
    			    }
        		);
    		});
        });		
	};
	
	$scope.selectedGroups = {
		//add user id?
		groups :[]
	};
	  
	$scope.newGroup = function(scope) {
		$scope.showCreateNewGroup = true;
		formValidated = false;
	};

	/*
	 * Add new group functons
	 */
	$scope.addNewGroup = function(scope) {
		$scope.validName = ! $scope.aGroup.name || ! $scope.aGroup.name.length > 0;
		$scope.validAlias = ! $scope.aGroup.alias || ! $scope.aGroup.alias.length > 0;
		$scope.validDescrpt = ! $scope.aGroup.description || ! $scope.aGroup.description.length > 0;
		formValidated = !($scope.validName || $scope.validAlias || $scope.validDescrpt);
		
		if (formValidated) {
			
			var aNewGroup = {};
			aNewGroup["name"] = $scope.aGroup.name;
			aNewGroup["alias"] = $scope.aGroup.alias;
			aNewGroup["private"] = $scope.aGroup.private;
			aNewGroup["description"] = $scope.aGroup.description;
			aNewGroup["managedBy"] = [{"id":$scope.userId}];

			//REST call go here to submit form 
			requestService.createDList(aNewGroup, $scope.token).then(
					function(success) {
						$scope.addGroupFail = false;
						var obj = success.data;
						$scope.getOwnedByMeGroups();
						$scope.resetNewGroupForm();
						$scope.showCreateNewGroup = ! $scope.showCreateNewGroup;
					}, 
				      function(error){
						$scope.addGroupFail = true;
						$scope.addGroupFailMsg = "Cannot create new group. \n" + error.data;
				    }
			);			
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
		$scope.addGroupFail = false;
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
	//end add new group functions
	
	$scope.editGroupDetails = function(aGroup) {
		//REST call to get information by aGroup.id
		shareDataService.setPickedGroup(aGroup);
		$scope.manageGroup();
	};

});











