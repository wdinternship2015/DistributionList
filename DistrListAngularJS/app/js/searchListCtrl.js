angular.module('searchListModule').controller('searchListCtrl', function ($scope, shareDataService,requestService, $log, $localStorage) {
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

		//make REST call here to get search result, still using get all lists
		$scope.search = function(searchParam) {
			requestService.getDistrLists($scope.token).then(
					function(success) {
						var obj = success.data;
						$scope.searchResultGroups = obj.data;
					}, 
				      function(error){
				        
				    }
			);
		};

});

angular.module('searchListModule').filter('privacy', function() {
    return function(input) {
        return input ? 'Private' : 'Public';
    }
});




