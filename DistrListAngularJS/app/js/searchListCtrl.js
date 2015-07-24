angular.module('searchListModule').controller('searchListCtrl', function ($scope, shareDataService, $log) {
	  console.log("searchListCtrl reporting for duty.");
	  $scope.msg = "";
	  $scope.searchResultGroups = "";
		  
	// make REST call to subscribe to selectedGroups
		$scope.subscribeGroups = function(scope)  {
			  $scope.searchResultGroups = shareDataService.getSearchResult();
		};
		
		$scope.selectedGroups = {
			// add user id?
			groups :[]
		};

		//make REST call here to get search result
		$scope.search = function(searchParam)  {
			var testSearchGroups = [{"id": "008", "name": "search name", "alias": "search@alias", "description": "test search description", "visibility": "Public", "members": [{"name":"Alice", "org": "WD Alice"}, {"name":"Bob", "org": "WD Bob"}, {"name":"Charlie", "org": "WD Charlie"}, {"name":"Dilbert", "org": "WD Dilbert"}]}];	  
			$scope.msg = searchParam;
			$scope.resultGroups = testSearchGroups;
			$scope.searchResultGroups = $scope.resultGroups;
		};

});

