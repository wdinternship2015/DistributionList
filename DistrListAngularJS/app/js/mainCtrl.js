
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
app.controller('mainCtrol', function ($scope,shareDataService, $log/*, $location, $http */) {
	  console.log("mainCtrol reporting for duty.");

	  $scope.topPanelUrl = 'partials/myListTopPanel.html';
	  $scope.viewUrl = 'partials/ownedByMe.html';
	  $scope.sidebarUrl = 'partials/sidebar.html';

	  
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
	  
});

/*
app.factory('shareDataService', function() {
	 var savedData = {};
	 
	 var set = function (data) {
	   savedData = data;
	 };
	 
	 var get = function () {
	  return savedData;
	 };

	 var pickedGroup = {};
	 
	 var setPickedGroup = function (data) {
		 pickedGroup = data;
	 };
	 
	 var getPickedGroup = function () {
	  return pickedGroup;
	 };

	 var searchResult = {};
	 
	 var setSearchResult = function (data) {
		 searchResult = data;
	 };
	 
	 var getSearchResult = function () {
	  return searchResult;
	 };
	 return {
	  set: set,
	  get: get,
	  setPickedGroup: setPickedGroup,
	  getPickedGroup: getPickedGroup,
	  setSearchResult: setSearchResult,
	  getSearchResult: getSearchResult,
	 }
	 
});
*/