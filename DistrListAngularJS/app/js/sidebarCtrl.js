angular.module('sidebarModule', []).controller('sidebarCtrl', function($scope, $log, shareDataService) {
	console.log("sidebarCtrl reporting for duty.");

	    $scope.topPanels = [{
	        name: 'my list top panel',
	        url: 'partials/myListTopPanel.html'},
	    {
	        name: 'search list top panel',
	        url: 'partials/searchListTopPanel.html'}];
	    $scope.topPanel = $scope.topPanels[0];

	    $scope.searchDList = function() {
	    	$scope.topPanel = $scope.topPanels[1];
	    }
	
	    $scope.myDList = function() {
	    	$scope.topPanel = $scope.topPanels[0];
	    }

});
