
/**
 * Main AngularJS Web Application
 */

/**
 * ng-include routing
 */
angular.module('DistributionList').controller('mainCtrl', function ($scope,RESTfulAPI,shareDataService,requestService, $log, $window, $location, $localStorage, $compile, Idle, Keepalive, $modal/*, $http */) {
//	  console.log("mainCtrl reporting for duty.");

	  	$scope.loginFail = false;
	  	//initialize token for local storage
		$scope.$storage = $localStorage.$default({
			token : "", 
			user: {}
		});
		
		//get token from redirect url
		var url = $location.path();
		var val = url.indexOf("=");
		if (val >= 0) {
			var split1 = url.split("=");
			var split2 = split1[1].split("&");
			var token = split2[0];
			$scope.$storage.token = token;
//?			tokenService.setToken(token);
			console.log("function: mainCtrl");
			findUser(); //stealing a user
			$window.location.href = 'https://localhost:8443/#/index.html';

		}
		
		//examine token, default login if token is empty, index.html if token is not empty
		$scope.token = $scope.$storage.token;
		$scope.userId = $scope.$storage.user.id;
		$scope.uName = $scope.$storage.user.descriptor;
		console.log('token: ' + $scope.token);
		console.log('uName: ' + $scope.uName);
		console.log('loggin user: ' + $scope.userId);
		if ($scope.token.length > 0) {
//			$window.location.href = 'https://localhost:8443/#/index.html';
			console.log("function: load app partials");
			$scope.viewUrl = 'partials/myListView.html';
			$scope.contentUrl = 'partials/ownedByMe.html';
			$scope.sidebarUrl = 'partials/sidebar.html';

			Idle.watch();
			console.log("idle watch start");

		} else {
			$scope.viewUrl = 'partials/login.html';
			console.log('login');
		}

		//route to search view
		$scope.searchDListView = function() {
			$scope.viewUrl = 'partials/searchListView.html';
		}
		
		//route to my D-List view
		$scope.myDListView = function() {
			$scope.viewUrl = 'partials/myListView.html';
		}

		// other REST calls to logout?
		$scope.logout = function() {
			//$scope.$storage.token = "";
			$localStorage.$reset({
				token : "", 
				user: {}
			});
			$scope.viewUrl = 'partials/login.html';
			$scope.sidebarUrl = '';
			$scope.topPanelUrl = '';
			console.log('logout token: ' + $scope.token);
			console.log('logout user: ' + $scope.userId);
		}

		// temporary login. will change when calls to the AD can be
		// made
		$scope.login = function() {
			$window.location.href = RESTfulAPI.OAuthUrl();
			//login fail
			/*
			 * $scope.loginFail = false;
			 * $scope.loginFailMsg = "Login Failed. \n" + error.data;
			 */
		}

		// idle logout functions
		function closeModals() {
			if ($scope.warning) {
				$scope.warning.close();
				$scope.warning = null;
			}
			if ($scope.timedout) {
				$scope.timedout.close();
				$scope.timedout = null;
			}
		}
		$scope.$on('IdleStart', function() {
			closeModals();
			/*
			 * $scope.warning = $modal.open({ templateUrl :
			 * 'warning-dialog.html', windowClass : 'modal-danger'
			 * });
			 */
		});
		$scope.$on('IdleEnd', function() {
			closeModals();
		});
		$scope.$on('IdleTimeout', function() {
			console.log("idle timeout");
			closeModals();
			$scope.logout();
			$scope.timedout = $modal.open({
				templateUrl : 'timedout-dialog.html',
				windowClass : 'modal-danger'
			});
		});
		//end idle logout functions

//fake login by stealing user id
		$scope.getUsers = function(uName) {
	//		console.log("scope.username: " + $scope.username);
	//		console.log("username: " + uName);
			if (uName && uName.length > 0) {
				requestService.getWorkers(encodeURI(uName), $scope.$storage.token).then(
						function(success) {
							var obj = JSON.parse(success.data);
							var numWorkers = obj.total;
							$scope.workersTotal = numWorkers;
							$scope.workers = obj.data;
							if ($scope.workers && $scope.workers.length > 0) {
								$scope.showUser = true;
							} else {
								$scope.showUser = false;
							}
						}, 
					      function(error){
					        console.log("getOptions failed");
					    }
				);
			}
		};
		
		$scope.setUser = function(worker) {
			console.log("function: setuser");
			$scope.chosenName = worker.descriptor;
			$scope.getUsers();
			console.log("worker.id: " + worker.id);
			$scope.$storage.user = worker;
			$scope.loggedinUser = worker.descriptor;
			$scope.userId = $scope.$storage.user.id;
			console.log("uName: " + $scope.uName);
			console.log("scope.user: " + $scope.userId);
//			$scope.$modalInstance.close();
		};
		
		$scope.findUser = function(){
            $scope.$modalInstance = $modal.open({
               scope:$scope,
               templateUrl: 'pickUser.html',
               controller: 'mainCtrl'
             });
           };
           
           function findUser() {
        	   console.log("function find user");
               $scope.$modalInstance = $modal.open({
                  scope:$scope,
                  templateUrl: 'pickUser.html',
                  controller: 'mainCtrl'
                });
              };
              $scope.ok = function(){
            	  console.log("function: ok");
                  $scope.$modalInstance.close();
                };
      
});

