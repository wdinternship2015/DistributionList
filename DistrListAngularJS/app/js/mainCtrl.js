
/**
 * Main AngularJS Web Application
 */
var app = angular.module('DistributionList', [ 'ngStorage', 'myDListModule', 'searchListModule' , 'ngIdle' , 'ui.bootstrap' ]);

angular.module('myDListModule', [ 'ngStorage', 'checklist-model' ]);
angular.module('searchListModule', [ 'ngStorage', 'checklist-model' ]);


//idle logout config
app.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
	  IdleProvider.idle(5*60);  //seconds
	  IdleProvider.timeout(5); //seconds
//	  KeepaliveProvider.interval(10);
}]);
//start idle watch
app.run(['Idle', function(Idle) {
    Idle.watch();
//    $scope.started = true;
    console.log("idle watch start");
}]);

/**
 * ng-include routing
 */
app.controller('mainCtrl', function ($scope,tokenService,shareDataService,requestService, $log, $window, $location, $localStorage, $compile, Idle, Keepalive, $modal/*, $http */) {
	  console.log("mainCtrl reporting for duty.");
//	  $scope.started = false;
	  
	  $scope.$storage = $localStorage.$default({
          token: ""
        });

	var url = $location.path();
	console.log('index.html url: ' + url);

	var val = url.indexOf("=");
	if (val >= 0) {
		var split1 = url.split("=");
		var split2 = split1[1].split("&");
		var token = split2[0];
		$scope.$storage.token = token;
                tokenService.setToken(token); 
	}
	  //alert("In Main: " + shareDataService.getToken());
	  $scope.token = $scope.$storage.token;
	console.log('token: ' + $scope.token); 
	console.log('token length: ' + $scope.token.length);
	if ($scope.token.length > 0) {
		$window.location.href =  'https://localhost:8443/#/index.html';
		$scope.viewUrl = 'partials/myListView.html';
		$scope.contentUrl = 'partials/ownedByMe.html';
		$scope.sidebarUrl = 'partials/sidebar.html';
	} else {
		$scope.viewUrl = 'partials/login.html';
		console.log('login');
	}	  

	  $scope.searchDListView = function() {
	  	$scope.viewUrl = 'partials/searchListView.html';
	  }
	  $scope.myDListView = function() {
	 	$scope.viewUrl = 'partials/myListView.html';
	  }
		  
	//other REST calls to logout?	  
	 $scope.logout = function() {
		 $scope.$storage.token = "";
		$scope.viewUrl = 'partials/login.html';
		$scope.sidebarUrl = '';
		$scope.topPanelUrl = '';
	 }

//temporary login. will change when calls to the AD can be made
         $scope.login = function(){
               $scope.viewUrl= 'partials/login.html';

          }

        $scope.submit = function(){
            angular.element(document.querySelector('#loggingIn')).append($compile('<a id=token href="https://i-c3da750a.workdaysuv.com/super/authorize?response_type=token&client_id=ZWM2Yjg5OTAtZWQyYy00MWFlLWFhNjgtODlhODZkZDA4MjYy"></a>')($scope));
            //angular.element(document.querySelector('#loggingIn')).append($compile('<a id=token href="https://i-7ad0de8d.workdaysuv.com/super/authorize?response_type=token&client_id=ZWM2Yjg5OTAtZWQyYy00MWFlLWFhNjgtODlhODZkZDA4MjYy"></a>')($scope));
            var elem = document.querySelector('#token');
            elem.click();
        }

//idle logout functions
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
			$scope.warning = $modal.open({
				templateUrl : 'warning-dialog.html',
				windowClass : 'modal-danger'
			});
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

app.directive('authenticate', function($compile, $window, $location){
	
return{
restrict: 'AE',
scope: false,
// template:'<a
// href="https://i-e0efe117.workdaysuv.com/super/authorize?response_type=token&client_id=MjA0YjQzY2UtMDQ2Yy00ZTQ5LTg0NGEtY2I4M2QzMjM4Njgy"
// ng-click="submit()"></a>',
link: function(scope, element, attrs){
  element.on('click', function(onClickEvent){
	  console.log('autheticate directive');
	  console.log(document.querySelector('#testbutton'));
 //   angular.element(document.querySelector('#testbutton')).append($compile('<a id=token href="https://i-0caa36fb.workdaysuv.com/super/authorize?response_type=token&client_id=Y2UzYjgyZjctYTNhYy00MjVhLWE3NTctNTRlYzBhOWIxNjRj""></a>')(scope));
    var elem = document.querySelector('#token');
    elem.click();
    //document.querySelector('#iframe2').style.display="block";
    });
               
}
};
});
