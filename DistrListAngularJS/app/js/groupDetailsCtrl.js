angular.module('myDListModule').controller('groupDetailsCtrl', function($scope, shareDataService, requestService, $log, $localStorage) {
	//$scope.$storage.token
	$scope.thisGroup = shareDataService.getPickedGroup();
	$scope.showGroupInfo = true;
	$scope.showWorker = false;
	$scope.workersTotal = "#";
	$scope.memberToAdd;
	$scope.selectedMembers = {
			//add group id?
			members :[]
	};
		
	$scope.getOptions = function(scope) {
//		console.log("add memeber param: " + $scope.addMemeber);
		if ($scope.addMemeber.length < 3) {
			$scope.showWorker = false;
		} else {
			requestService.getWorkers(encodeURI($scope.addMemeber), $scope.token).then(
					function(success) {
						var obj = JSON.parse(success.data);
						var numWorkers = obj.total;
						$scope.workersTotal = numWorkers;
						$scope.workers = obj.data;
						if ($scope.workers && $scope.workers.length > 0) {
							$scope.showWorker = true;
						} else {
							$scope.showWorker = false;
						}
					}, 
				      function(error){
				        console.log("getOptions failed");
				    }
			);
		}
	}
	
	$scope.setMemeber = function(worker) {
		$scope.addMemeber = worker.descriptor;
		$scope.getOptions();
		$scope.memberToAdd = worker;
	}
	
//make REST call onload here to get distribution lists detail of thisGroup	
	$scope.getDListDetails = function(scope)  {
		
	};
	
//make REST call to remove selectedMembers
	$scope.removeMembers = function(scope)  {
		
	};
	
	$scope.viewMemberDetails = function(aMemeber) {
		//REST call to get information of aMember
		//shareDataService.setPickedMember(aMemeber);
		//$scope.viewMember();
		$scope.showWorker = true;
		requestService.getWorkerDetails(encodeURI($scope.addMemeber), $scope.token).then(
				function(success) {
					var obj = JSON.parse(success.data);
					var numWorkers = obj.total;
					$scope.workersTotal = numWorkers;
					$scope.workers = obj.data;
				}, 
			      function(error){
			        console.log("getOptions failed");
			    }
		);
	};

//make REST call to remove selectedMembers
	$scope.saveGroupDetails = function(scope)  {
		$scope.showGroupInfo = ! $scope.showGroupInfo;
	};
	
	$scope.addMember = function(scope) {
		console.log("add member: " + $scope.memberToAdd.id);
		$scope.showWorker = false;
		
		//REST call to add member, on success
		$scope.addMemeber = "";

		//on failure
			//display error message
	}
	
});
