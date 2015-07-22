<<<<<<< Updated upstream
 angular.module('DistributionList').factory('shareDataService', function() {
=======
var dataMod = angular.module('dataSharingModule', []); 

dataMod.factory('shareDataService', function() {
>>>>>>> Stashed changes
	 var savedData = {}
	 function set(data) {
	   savedData = data;
	 }
	 function get() {
	  return savedData;
	 }

	 return {
	  set: set,
	  get: get
	 }

});
