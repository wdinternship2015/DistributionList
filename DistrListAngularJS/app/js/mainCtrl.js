
/**
 * Main AngularJS Web Application
 */
var app = angular.module('DistributionList', [ 'ngStorage', 'myDListModule', 'searchListModule' ]);

angular.module('myDListModule', [ 'ngStorage', 'checklist-model' ]);
angular.module('searchListModule', [ 'ngStorage', 'checklist-model' ]);
	

/**
 * ng-include routing
 */
app.controller('mainCtrl', function ($scope,shareDataService, $log, $window, $location, $localStorage, $compile/*, $http */) {
	  console.log("mainCtrl reporting for duty.");

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
	}
	  
	  $scope.token = $scope.$storage.token;
	console.log('token: ' + $scope.token); 
	console.log('token length: ' + $scope.token.length);
	if ($scope.token.length > 0) {
		$window.location.href =  'https://localhost:8443/#/index.html';
		$scope.viewUrl = 'partials/myListView.html';
		$scope.contentUrl = 'partials/ownedByMe.html';
		$scope.sidebarUrl = 'partials/sidebar.html';
	} else {
		$scope.viewUrl = 'partials/home.html';
		console.log('home');
	}	  

	  $scope.searchDListView = function() {
	  	$scope.viewUrl = 'partials/searchListView.html';
	  }
	  $scope.myDListView = function() {
	 	$scope.viewUrl = 'partials/myListView.html';
	  }
		  
	//other REST calls to logout?	  
	 $scope.logout = function() {
		$localStorage.$reset();
		$scope.viewUrl = 'partials/home.html';
		$scope.sidebarUrl = '';
		$scope.topPanelUrl = '';
	 }

//temporary login. will change when calls to the AD can be made
         $scope.login = function(){
               $scope.viewUrl= 'partials/login.html';

          }

        $scope.submit = function(){
            angular.element(document.querySelector('#loggingIn')).append($compile('<a id=token href="https://i-e0efe117.workdaysuv.com/super/authorize?response_type=token&client_id=MjA0YjQzY2UtMDQ2Yy00ZTQ5LTg0NGEtY2I4M2QzMjM4Njgy"></a>')($scope));
            var elem = document.querySelector('#token');
            elem.click();


        }





});

app.directive('authenticate', function($compile, $window, $location){
	
return{
restrict: 'AE',
scope: false,
//template:'<a href="https://i-e0efe117.workdaysuv.com/super/authorize?response_type=token&client_id=MjA0YjQzY2UtMDQ2Yy00ZTQ5LTg0NGEtY2I4M2QzMjM4Njgy" ng-click="submit()"></a>',    
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

