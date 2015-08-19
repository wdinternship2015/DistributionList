angular.module('myDListModule').controller('groupDetailsCtrl', function($scope, shareDataService, requestService, $log, $localStorage) {
	$scope.thisGroup = shareDataService.getPickedGroup();
	console.log("thisGroup.id: " + $scope.thisGroup.id);
	var editFormValidated = true;
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
	//get suggested member options for adding members	
	$scope.getOptions = function(scope) {
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
	};
	
	$scope.setMember = function(worker) {
		$scope.memberName = worker.descriptor;
		$scope.getOptions();
		$scope.memberToAdd = worker;
	};
	
//make REST call onload here to get distribution lists detail of thisGroup	
	$scope.getDListDetails = function(scope)  {
		
	};
	
//make REST call to remove selectedMembers
	$scope.removeMembers = function(scope)  {
		
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

//make REST call to remove selectedMembers
	$scope.saveGroupDetails = function(scope)  {
		$scope.validNewName = ! $scope.thisGroup.name || ! $scope.thisGroup.name.length > 0;
		$scope.validNewAlias = ! $scope.thisGroup.alias || ! $scope.thisGroup.alias.length > 0;
		$scope.validNewDescrpt = ! $scope.thisGroup.description || ! $scope.thisGroup.description.length > 0;
		editFormValidated = !($scope.validNewName || $scope.validNewAlias || $scope.validNewDescrpt);
		
		if (editFormValidated) {
			
			var editedGroup = {};
			editedGroup["name"] = $scope.thisGroup.name;
			editedGroup["alias"] = $scope.thisGroup.alias;
			editedGroup["private"] = $scope.thisGroup.private;
			editedGroup["description"] = $scope.thisGroup.description;
			editedGroup["managedBy"] = [{"id":$scope.userId}];

			//REST call go here to submit form 
			requestService.editDistrList(editedGroup, $scope.thisGroup.id, $scope.token).then(
					function(success) {
						console.log("edit group success: " + success.data);
						$scope.refreshGroupInfo();
					}, 
				      function(error){
						$scope.addGroupFail = true;
						$scope.addGroupFailMsg = "Cannot create new group. \n" + error.data;
				    }
			);			
			$scope.showGroupInfo = ! $scope.showGroupInfo;
		}
	};
	
	$scope.addMember = function(scope) {
		if ($scope.memberName && $scope.memberToAdd.length !==0 /*&& $scope.memberToAdd.length > 0 && $scope.memberName && $scope.memberName.length > 0*/) {		
		
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
					console.log("add member response: " + success.data);
					$scope.refreshGroupInfo();
				}, 
			    function(error){
					console.log("add members failed + " + error.data);
					$scope.addMemberError = true;
					$scope.addMemberErrorMsg = error.data;
			        console.log("show error: " + $scope.addMemberError + " msg: " + $scope.addMemberErrorMsg);
			    }
			);			
		} else if ($scope.memberName && $scope.memberName.length > 0 && $scope.memberToAdd.length == 0){
			$scope.addMemberError = true;
			$scope.addMemberErrorMsg = "Choose a member from the list";
		} else {
			$scope.addMemberError = true;
			$scope.addMemberErrorMsg = "A name is required";
		}
	};
	
	$scope.refreshGroupInfo = function(scope) {
		requestService.getDList($scope.thisGroup.id, $scope.token).then(
				function(success) {
					$scope.thisGroup = JSON.parse(success.data);
					console.log("refresh group details: " + success.data);
				}, 
			      function(error){
			        console.log("getOptions failed");
			    }
		);
	};
	
	$scope.testMembers = {"members":[{"descriptor":"Tom Quinn","id":"c43bcfde6bb7100b57d2365310621c4f"}, {"descriptor":"June Jenkins","id":"c43bcfde6bb7100b57d62dec4a02246d"}]};
});
