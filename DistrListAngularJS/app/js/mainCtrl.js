
/**
 * Main AngularJS Web Application
 */

/**
 * ng-include routing
 */
angular.module('DistributionList').controller('mainCtrl', function ($scope,RESTfulAPI,shareDataService,requestService, $log, $window, $location, $localStorage, $compile, Idle, Keepalive, $modal/*, $http */) {
	  console.log("mainCtrl reporting for duty.");

	  	$scope.loginFail = false;
	  	//initialize token for local storage
		$scope.$storage = $localStorage.$default({
			token : ""
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
		}
		
		//examine token, default login if token is empty, index.html if token is not empty
		$scope.token = $scope.$storage.token;
		console.log('token: ' + $scope.token);
		console.log('token length: ' + $scope.token.length);
		if ($scope.token.length > 0) {
			$window.location.href = 'https://localhost:8443/#/index.html';
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
			$scope.$storage.token = "";
			$scope.viewUrl = 'partials/login.html';
			$scope.sidebarUrl = '';
			$scope.topPanelUrl = '';
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

});

