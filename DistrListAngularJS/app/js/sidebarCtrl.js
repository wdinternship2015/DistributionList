angular
		.module('DistributionList')
		.controller(
				'sidebarCtrl',
				function($scope, shareDataService, $log, $window, $location) {
					
					var pressed = "#66d9ff";
					var released = "#007399";
					//$scope.userLoggedin = $scope.loggedinUser;
					document.getElementById("myDListBtn").style.background = pressed;
					document.getElementById("searchDListBtn").style.background = released;
					$scope.searchDList = function() {
						document.getElementById("myDListBtn").style.background = released;
						document.getElementById("searchDListBtn").style.background = pressed;
						$scope.searchDListView();
					}
					$scope.myDList = function() {
						document.getElementById("myDListBtn").style.background = pressed;
						document.getElementById("searchDListBtn").style.background = released;
						$scope.myDListView();
					}

				});
