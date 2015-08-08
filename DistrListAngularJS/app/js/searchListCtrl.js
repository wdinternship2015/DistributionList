angular.module('searchListModule').controller('searchListCtrl', function ($scope, shareDataService,requestService, $log, $localStorage) {
	 // console.log("searchListCtrl reporting for duty.");
	  console.log('searchListCtrl token: ' + $scope.token); 
	  //$scope.$storage.token
	  
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
			
			requestService.searchDLists(encodeURI(searchString),$scope.token).then(
					function(success) {
						var obj = JSON.parse(success.data);
						$scope.searchResultGroups = obj.data;
					}, 
				      function(error){
				        console.log("search failure");
				    }
			);
		};

});

angular.module('searchListModule').filter('privacy', function() {
    return function(input) {
        return input ? 'Private' : 'Public';
    }
});




