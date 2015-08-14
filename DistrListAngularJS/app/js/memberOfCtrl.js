angular.module('myDListModule').controller('memberOfCtrl', function ($scope, shareDataService,requestService, $log, $localStorage) {
	  console.log("memberOfCtrl reporting for duty.");
	  //$scope.$storage.token
//	  $scope.memberOfGroups = shareDataService.get();
	  
//make REST call here to get distribution lists I am a member of, , still using get all lists
	$scope.getMemberOfGroups = function(scope)  {
		requestService.getAllDLists($scope.token).then(
				function(success) {
					var obj = success.data;
					$scope.memberOfGroups = obj.data;
				}, 
			      function(error){
			        
			    }
		);
	};
	  
// make REST call to delete selectedGroups
	$scope.unsubscribeFromGroups = function(scope)  {
		
	};
	
	$scope.selectedGroups = {
		// add user id?
		groups :[]
	};

});






















