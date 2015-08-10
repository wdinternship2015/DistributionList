angular.module('searchListModule').controller('searchListCtrl', function ($scope, shareDataService,requestService, $log, $localStorage) {
	 
	  console.log('searchListCtrl token: ' + $scope.token); 
	  $scope.searchResultMsg = "Enter search parameters";
	  
	  $scope.searchOptions = [{"option": "Group Name"}, {"option": "Owner Name"}];

	  $scope.searchResultGroups = "";
		  
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
			//build search string with selected search type
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
				requestService.getDLists($scope.token).then(
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

});

angular.module('searchListModule').filter('privacy', function() {
    return function(input) {
        return input ? 'Private' : 'Public';
    }
});




