angular.module('searchListModule').controller('searchListCtrl', function ($scope, shareDataService, requestService, $log, $localStorage, $modal, $confirm, $location) {
	 $scope.defaultSearchView = true;
	  console.log('searchListCtrl token: ' + $scope.token); 
	  $scope.searchResultMsg = "Enter search parameters";
	  
	  $scope.searchOptions = [{"option": "Group Name"}, {"option": "Owner Name"}];
	  $scope.groupNameSearch = true;
	  $scope.searchResultGroups = "";
	  $scope.owner={};
	  $scope.aGroup = {};
		  
	// make REST call to subscribe to selectedGroups
		$scope.subscribeGroups = function(scope)  {
			if ($scope.selectedGroups.groups.length < 1) {
				return;
			}
			console.log("subscribe to groups: " + $scope.selectedGroups.groups.length);
			var msg="";
			angular.forEach($scope.selectedGroups.groups, function(item) {
				msg += item.descriptor + ',   \n';
			});
			console.log("msg: " + msg);
			$confirm({text: msg, title: 'Subscribe to ' + $scope.selectedGroups.groups.length + ' groups?', ok: 'Subscribe', cancel: 'Cancel'})
		        .then(function() {
		        	var members = {};
					members["members"] = [{"id" : $scope.userId}];
		        	angular.forEach($scope.selectedGroups.groups, function(item) {
		        		requestService.addMemberToDList(members, item.id, $scope.token).then(
	    					function(success) {
	    						$scope.memberName = "";
	    						$scope.memberToAdd = "";
	    						$scope.thisGroup = JSON.parse(success.data);
	    						console.log("members: " + $scope.thisGroup.members);
	    						console.log("add member response: " + success.data);
	    						item["relation"] += "Member of";
	    					}, 
	    				    function(error){
	    						console.log("add members failed + " + error.data);
	    						$scope.addMemberError = true;
	    						$scope.addMemberErrorMsg = error.data;
	    				        console.log("show error: " + $scope.addMemberError + " msg: " + $scope.addMemberErrorMsg);
	    				    }
		    			);
		    		});
	        });			
		};
		
		$scope.selectedGroups = {
			// add user id?
			groups :[]
		};


		$scope.search = function(scope) {
			var lastSearch = {};
//			console.log("groupNameSearch: " + $scope.groupNameSearch);
//			console.log("ownerNameSearch: " + $scope.ownerNameSearch);
			if($scope.groupNameSearch) {
				lastSearch["searchType"] = $scope.searchBy;
				lastSearch["searchParam"] = $scope.searchParam;
				$scope.searchByGroupName();
			} else if ($scope.ownerNameSearch) {
				lastSearch["searchType"] = $scope.searchBy;
				lastSearch["searchOwner"] = $scope.owner;
				$scope.searchByOwnerName();
			}
		};

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
							$scope.searchResultGroups = $scope.getRelations(obj.data);
							console.log("searchResultGroups: " + $scope.searchResultGroups);
						}, 
					      function(error){
					        console.log("search failure");
					    }
				);
			} else {
				requestService.getAllDLists($scope.token).then(
						function(success) {
							var obj = success.data;
							$scope.searchResultGroups = $scope.getRelations(obj.data);
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
							$scope.searchResultGroups = $scope.getRelations(obj.data);
							$scope.searchResultMsg = obj.total + " items owned by " + $scope.owner.descriptor;
							console.log("searchResultGroups: " + $scope.searchResultGroups);
						}, 
					      function(error){
							console.log("error: " + error.data);
					    }
				);
			} else if (! $scope.ownerName || $scope.ownerName.length <= 0) {
				$scope.searchResultMsg = "Search by owner requires a valid name";
				$scope.searchResultGroups = {};
			} else {
				$scope.searchResultMsg = "Please select a member from the list of suggestions";
				$scope.searchResultGroups = {};
			}
		};

		$scope.viewGroupDetails = function (group) {
			$scope.defaultSearchView = ! $scope.defaultSearchView;
			$scope.thisGroup = group;
		};
		
		$scope.viewSearchResult = function (group) {
			$scope.defaultSearchView = ! $scope.defaultSearchView;
		};
				
		$scope.viewMemberDetails = function(index, member) {
			if ($scope.thisGroup.members[index].businessTitle) {
				return;
			}
			requestService.getWorkerDetails($scope.thisGroup.members[index].id, $scope.token).then(
					function(success) {
						var obj = JSON.parse(success.data);
						if ($scope.thisGroup.members[index].id == obj.id) {
							$scope.thisGroup.members[index]["businessTitle"] = obj.businessTitle;
							$scope.thisGroup.members[index]["primaryWorkEmail"] = obj.primaryWorkEmail;
							$scope.thisGroup.members[index]["primarySupervisoryOrganization"] = obj.primarySupervisoryOrganization.descriptor;
							$scope.thisGroup.members[index]["primaryWorkAddressText"] = obj.primaryWorkAddressText;
						}		
					}, 
				      function(error){
				        console.log("getOptions failed");
				    }
			);
		};
		
		$scope.getRelations = function(data) {
			angular.forEach(data, function(item) {
				console.log("members: " + JSON.stringify(item.members));
				var relation = [];
				if(shareDataService.getMyListStr() && shareDataService.getMyListStr().indexOf(item.id) >= 0) {
					relation.push("Owned by me");
				} else if(shareDataService.getMemberOfStr() && shareDataService.getMemberOfStr().indexOf(item.id) >= 0) {
					relation.push("Member of");
				} else if(item.members && JSON.stringify(item.members).indexOf($scope.userId) >= 0 ) {
					relation.push("Member Of");
				}
				item["relation"] = relation.toString();
			});
//			console.log("add relation: " + relation.toString());
			return data;
		};
});

angular.module('searchListModule').filter('privacy', function() {
    return function(input) {
        return input ? 'Private' : 'Public';
    }
});

/**
 * searchResult.managedBy --> stringify --> look for string "user.id" --> "owned by me" or "member of"
 */


