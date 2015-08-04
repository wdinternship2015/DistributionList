angular.module('searchListModule').controller('searchListCtrl', function ($scope, shareDataService, $log, $localStorage) {
	 // console.log("searchListCtrl reporting for duty.");
	  console.log('searchListCtrl token: ' + $scope.token); 
	  //$scope.$storage.token
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
			
			var obj = JSON.parse(sample);
			
			
			$scope.searchResultGroups = obj.data;
	//		$scope.searchResultGroups = $scope.resultGroups;
		};

});


angular.module('searchListModule').filter('privacy', function() {
    return function(input) {
        return input ? 'Private' : 'Public';
    }
});

var sample = '{"total":2,"data":[{"descriptor":"","id":"22376a6ad62510000c14dd89deea0028","private":false,"iid":"16237$4"},{"descriptor":"The First List","id":"7c3331224db21000058faf4b9049001b","lastUpdateBy":{"descriptor":"Isla Koenig","id":"fd30c20b3d4a4801a5c4a272327e77fd"},"description":"A test list","organization":{"descriptor":"500.1 Global Modern Services, Inc. (USA)","id":"cb550da820584750aae8f807882fa79a"},"private":false,"name":"The First List","alias":"list1","iid":"16237$1"}]}';
var testSearchGroups = [{"id": "008", "name": "search name", "alias": "search@alias", "description": "test search description", "visibility": "Public", "members": [{"name":"Alice", "org": "WD Alice"}, {"name":"Bob", "org": "WD Bob"}, {"name":"Charlie", "org": "WD Charlie"}, {"name":"Dilbert", "org": "WD Dilbert"}]}, {"id": "009", "name": "search name 2", "alias": "search2@alias", "description": "test search 2 description", "visibility": "Private", "members": [{"name":"Elle", "org": "WD Elle"}, {"name":"Frank", "org": "WD Frank"}, {"name":"Gary", "org": "WD Gary"}, {"name":"Henry", "org": "WD Henry"}]}];	  
