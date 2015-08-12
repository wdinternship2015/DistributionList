angular.module('DistributionList').factory('RESTfulAPI',[function($http){
  
	var api = {};
	
	//var SUV = "https://i-7ad0de8d.workdaysuv.com";
	//var SUV = "https://i-c3da750a.workdaysuv.com";
	var SUV = "https://i-98499343.workdaysuv.com";
	
	//var OAuthCID = "ZWM2Yjg5OTAtZWQyYy00MWFlLWFhNjgtODlhODZkZDA4MjYy"; //i-7ad0de8d.workdaysuv.com
	var OAuthCID = "MjgxMDQ5NjctN2U0Ny00MDU1LWEyMTctNmE5OTU4Njg5MmQy"; //i-98499343.workdaysuv.com
	
	
	api.OAuthUrl = function(){
		return SUV + "/super/authorize?response_type=token&client_id=" + OAuthCID;
	};
	
	api.DListUrl = function(){
		return SUV + "/ccx/internalapi/emailDList/v1/super/distributionList";
	};

	api.workersUrl = function(){
		return SUV + "/ccx/api/v1/super/workers";
	};
	 
	api.addMemberUrl = function(){
		return SUV + "/ccx/internalapi/emailDList/v1/super/distributionList/16448$1?type=addMembers";
	};

	return api;

}]);