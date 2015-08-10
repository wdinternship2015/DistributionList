angular.module('myDListModule').controller('groupDetailsCtrl', function($scope, shareDataService, requestService, $log, $localStorage) {
	console.log("membername: " + $scope.memberName);
	//$scope.$storage.token
	$scope.thisGroup = shareDataService.getPickedGroup();
	$scope.showGroupInfo = true;
	$scope.showWorker = false;
	//minimum string length needed for search workers
	var minLength = 3;
	$scope.workersTotal = "#";
	$scope.memberToAdd;
	$scope.selectedMembers = {
			//add group id?
			members :[]
	};
		
	$scope.getOptions = function(scope) {
//		console.log("add Member param: " + $scope.addMember);
		$scope.addMemberError = false;
		if ($scope.memberName.length < minLength) {
			$scope.showWorker = false;
		} else {
			requestService.getWorkers(encodeURI($scope.memberName), $scope.token).then(
					function(success) {
						var obj = JSON.parse(success.data);
						var numWorkers = obj.total;
						$scope.workersTotal = numWorkers;
						$scope.workers = obj.data;
						if ($scope.workers && $scope.workers.length > 0) {
							$scope.addMemberError = false;
							$scope.showWorker = true;
						} else {
							$scope.showWorker = false;
							$scope.addMemberError = true;
							$scope.addMemberErrorMsg = "No member matching this description";

						}
					}, 
				      function(error){
				        console.log("getOptions failed");
				    }
			);
		}
	}
	
	$scope.setMember = function(worker) {
		$scope.memberName = worker.descriptor;
		$scope.getOptions();
		$scope.memberToAdd = worker;
	}
	
//make REST call onload here to get distribution lists detail of thisGroup	
	$scope.getDListDetails = function(scope)  {
		
	};
	
//make REST call to remove selectedMembers
	$scope.removeMembers = function(scope)  {
		
	};
	
	$scope.viewMemberDetails = function(aMember) {
		//REST call to get information of aMember
		//shareDataService.setPickedMember(aMember);
		//$scope.viewMember();
		$scope.showWorker = true;
		requestService.getWorkerDetails(encodeURI($scope.memberName), $scope.token).then(
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
		if ($scope.memberName && $scope.memberName.length > 0) {		
		
			console.log("add member: " + $scope.memberName);
			$scope.showWorker = false;
			
			//REST call to add member, on success
			$scope.memberName = "";
			
			//on failure
				//display error message
			$scope.addMemberError = true;
			$scope.addMemberErrorMsg = "Can't add member OR member doesn't exist";
		} else {
			$scope.addMemberError = true;
			$scope.addMemberErrorMsg = "A name is required";
		}
	}
	
});
