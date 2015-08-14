angular.module('searchListModule').controller('searchListCtrl', function ($scope,  shareDataService,requestService, $log, $localStorage) {
	 
	  console.log('searchListCtrl token: ' + $scope.token); 
	  $scope.searchResultMsg = "Enter search parameters";
	  
	  $scope.searchOptions = [{"option": "Group Name"}, {"option": "Owner Name"}];
	  $scope.groupNameSearch = true;
	  $scope.searchResultGroups = "";
	  $scope.owner={};
		  
	// make REST call to subscribe to selectedGroups
		$scope.subscribeGroups = function(scope)  {
			 // $scope.searchResultGroups = shareDataService.getSearchResult();
		};
		
		$scope.selectedGroups = {
			// add user id?
			groups :[]
		};

		//make REST call here to get search result, still using get all lists
		$scope.search = function(scope) {
			console.log("groupNameSearch: " + $scope.groupNameSearch);
			console.log("ownerNameSearch: " + $scope.ownerNameSearch);
			if($scope.groupNameSearch) {
				$scope.searchByGroupName();
			} else if ($scope.ownerNameSearch) {
				$scope.searchByOwnerName();
			}
			//build search string with selected search type
/*			var searchString = $scope.searchParam;
			if ($scope.searchParam && $scope.searchParam.length > 0) {
				requestService.searchDLists(encodeURI(searchString),$scope.token).then(
						function(success) {
							var obj = JSON.parse(success.data);
							$scope.searchResultMsg = obj.total + " items matching search parameters";
							$scope.searchResultGroups = obj.data;
						}, 
					      function(error){
					        console.log("search failure");
					    }
				);
			} else {
				requestService.getAllDLists($scope.token).then(
						function(success) {
							var obj = success.data;
							$scope.searchResultGroups = obj.data;
							$scope.searchResultMsg = obj.total + " items matching search parameters";
						}, 
					      function(error){
							console.log("error: " + error.data);
					    }
				);
			}
*/		};

		$scope.setSearchInputArea = function (scope) {
			$scope.groupNameSearch = $scope.searchBy.option==$scope.searchOptions[0].option;
			$scope.ownerNameSearch = $scope.searchBy.option==$scope.searchOptions[1].option;
			console.log("groupNameSearch: " + $scope.groupNameSearch);
			console.log("ownerNameSearch: " + $scope.ownerNameSearch);
			$scope.owner = {};
			$scope.ownerName = "";
		};
		
		$scope.getOwners = function(uName) {
			if ($scope.owner.descriptor && $scope.owner.descriptor!= $scope.ownerName) {
				$scope.owner = {};
			}

			if (uName && uName.length > 0) {
				requestService.getWorkers(encodeURI(uName), $scope.token).then(
						function(success) {
							var obj = JSON.parse(success.data);
							$scope.owners = obj.data;
							if ($scope.owners && $scope.owners.length > 0) {
								$scope.showOwner = true;
							} else {
								$scope.showOwner = false;
							}
						}, 
					      function(error){
					        console.log("getOptions failed");
					    }
				);
			}
		};
		$scope.setOwner = function(owner) {
			$scope.ownerName = owner.descriptor;
			$scope.owner = owner;
			console.log("set owner: " + $scope.owner.id);
			$scope.getOwners();
			$scope.showOwner = false;
		};
		
		$scope.searchByGroupName = function(scope) {
			var searchString = $scope.searchParam;
			if ($scope.searchParam && $scope.searchParam.length > 0) {
				requestService.searchDLists(encodeURI(searchString),$scope.token).then(
						function(success) {
							var obj = JSON.parse(success.data);
							$scope.searchResultMsg = obj.total + " items matching search parameters";
							$scope.searchResultGroups = obj.data;
						}, 
					      function(error){
					        console.log("search failure");
					    }
				);
			} else {
				requestService.getAllDLists($scope.token).then(
						function(success) {
							var obj = success.data;
							$scope.searchResultGroups = obj.data;
							$scope.searchResultMsg = obj.total + " items matching search parameters";
						}, 
					      function(error){
							console.log("error: " + error.data);
					    }
				);
			}
		};

		$scope.searchByOwnerName = function(scope) {
			console.log("search by owner: " + $scope.owner.id);
			console.log("owner info: " + $scope.owner.descriptor);
			if ($scope.owner.id && $scope.ownerName.length > 0) {
				requestService.searchByOwners($scope.owner.id, $scope.token).then(
						function(success) {
							var obj = JSON.parse(success.data);
							$scope.searchResultGroups = obj.data;
						//	console.log("success.data.data: " + $scope.ownedByMeGroups);
							$scope.searchResultMsg = obj.total + " items owned by " + $scope.owner.descriptor;
						}, 
					      function(error){
							console.log("error: " + error.data);
					    }
				);
			} else {
				$scope.searchResultMsg = "Please select a member from the list of suggestions";
			/*	requestService.getAllDLists($scope.token).then(
						function(success) {
							var obj = success.data;
							$scope.searchResultGroups = obj.data;
							$scope.searchResultMsg = obj.total + " items matching search parameters";
						}, 
					      function(error){
							console.log("error: " + error.data);
					    }
				); */
			}
		};

});

angular.module('searchListModule').filter('privacy', function() {
    return function(input) {
        return input ? 'Private' : 'Public';
    }
});




