angular.module('myDListModule').controller('groupDetailsCtrl', function($scope, shareDataService, requestService, $log, $localStorage) {
	$scope.thisGroup = shareDataService.getPickedGroup();
	console.log("thisGroup.id: " + $scope.thisGroup.id);
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
		$scope.memberToAdd = "";
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
		if ($scope.memberToAdd.length !==0 /*&& $scope.memberToAdd.length > 0 && $scope.memberName && $scope.memberName.length > 0*/) {		
		
			console.log("add member: " + $scope.memberName);
			$scope.showWorker = false;
			var members = {};
			members["members"] = [{"id" : $scope.memberToAdd.id}];
			//members["members"] = [{"id" : "247$257"}];
			//REST call to add member, on success
			requestService.addMemberToDList(members, $scope.thisGroup.id, $scope.token).then(
				function(success) {
					$scope.memberName = "";
					$scope.memberToAdd = "";
					$scope.thisGroup = JSON.parse(success.data);
					console.log("members: " + $scope.thisGroup.members);
					console.log("add member response: " + success.data);
				}, 
			    function(error){
					console.log("add members failed + " + error.data);
					$scope.addMemberError = true;
					$scope.addMemberErrorMsg = error.data;
			        console.log("show error: " + $scope.addMemberError + " msg: " + $scope.addMemberErrorMsg);
			    }
			);
			requestService.getDList($scope.thisGroup.id, $scope.token).then(
					function(success) {
						$scope.thisGroup = JSON.parse(success.data);
						console.log("refresh group details: " + success.data);
					}, 
				      function(error){
				        console.log("getOptions failed");
				    }
			);
		} else if ($scope.memberName && $scope.memberName.length > 0 && $scope.memberToAdd.length == 0){
			$scope.addMemberError = true;
			$scope.addMemberErrorMsg = "Choose a member from the list";
		} else {
			$scope.addMemberError = true;
			$scope.addMemberErrorMsg = "A name is required";
		}
	}
	
});
