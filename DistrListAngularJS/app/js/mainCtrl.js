
/**
 * Main AngularJS Web Application
 */
var app = angular.module('DistributionList', [ //'ngRoute', 
        'ownedByMeModule', 'memberOfModule', 'searchListModule', /*'dataSharingtModule',*/
]);

angular.module('ownedByMeModule', [ 'checklist-model' ]);
angular.module('memberOfModule', [ 'checklist-model' ]);
angular.module('searchListModule', [ 'checklist-model' ]);
	

/**
 * ng-include routing
 */
app.controller('mainCtrl', function ($scope,shareDataService, $log, $window, $location/*, $http */) {
	  console.log("mainCtrl reporting for duty.");

	$scope.token = "";

	var url = $location.path();
	console.log('index.html url: ' + url);

	var val = url.indexOf("=");
	if (val >= 0) {
		var split1 = url.split("=");
		var split2 = split1[1].split("&");
		var token = split2[0];
		shareDataService.setToken(token);
	}
	
	$scope.token  = shareDataService.getToken();
	console.log('token length: ' + $scope.token.length);
	if ($scope.token.length > 0) {

		$window.location.href =  'https://localhost:8443/#/index.html';
		$scope.topPanelUrl = 'partials/myListTopPanel.html';
		$scope.viewUrl = 'partials/ownedByMe.html';
		$scope.sidebarUrl = 'partials/sidebar.html';
	} else {
		$scope.viewUrl = 'partials/home.html';
		console.log('home');
	}	  
	  
	  $scope.searchDList = function() {
	  	$scope.topPanelUrl = 'partials/searchListTopPanel.html';
	  	$scope.viewUrl = 'partials/searchList.html';
	  }
	  $scope.myDList = function() {
	 	$scope.topPanelUrl = 'partials/myListTopPanel.html';
	 	$scope.viewUrl = 'partials/ownedByMe.html';
	  }
	  $scope.ownedByMe = function() {
		$scope.viewUrl = 'partials/ownedByMe.html';
	  }
	  $scope.memberOf = function() {
		$scope.viewUrl = 'partials/memberOf.html';
	  }
	  $scope.manageGroup = function() {
		$scope.viewUrl = 'partials/groupDetails.html';
	 }
	  
	  console.log('token: ' + $scope.token);
	  
	  $window.load = function(){
/*	   var element = document.querySelector('#iframe1'); 
	   //alert("Loading");
	   //alert("in controller: " + element.contentWindow.location.href);
	   var url = element.contentWindow.location.href; 
	   console.log('url: ' + url);
	   if(url.indexOf("#") >= 0){
	     var split1 = url.split("=");
	     var split2 = split1[1].split("&");
	     var token = split2[0];
	     console.log(token);
//	     $scope.token = token; 
	     shareDataService.setToken(token);
	     element.style.display="none";
	     document.querySelector('#iframe2').style.display = "block";
	     
	     $scope.appMain();
	   }
	   $scope.token  = shareDataService.getToken();
	   console.log('token: ' + $scope.token);
*/	  }

});

app.controller('iframeCtrl', function($scope){
    
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

/*
app.controller('mainCtrol', function ($scope,$window,shareDataService) {
  console.log("PageCtrlHome reporting for duty.");
  var jsonObj = JSON.parse(testWorkers);
  $scope.total = jsonObj.total;
  $scope.workers = jsonObj.data;
  $scope.datasize = $scope.workers.length;
  shareDataService.set($scope.workers);
  $scope.token = "";
  $window.load = function(){
   var element = document.querySelector('#iframe1'); 
   //alert("Loading");
   //alert("in controller: " + element.contentWindow.location.href);
   var url = element.contentWindow.location.href; 
   if(url.indexOf("#") >= 0){
     var split1 = url.split("=");
     var split2 = split1[1].split("&");
     var token = split2[0];
     console.log(token);
     $scope.token = token; 
     element.style.display="none";
     document.querySelector('#iframe2').style.display = "block";
   }
   console.log(token);
  }
});
*/