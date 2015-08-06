angular.module('DistributionList').factory('requestService',['$http', function($http){
  var service = {};
  service.getDistrLists = function(token){
    var response = 
      $http({
        //url: "https://i-7ad0de8d.workdaysuv.com/ccx/internalapi/emailDList/v1/super/distributionList",
        url: "https://i-c3da750a.workdaysuv.com/ccx/internalapi/emailDList/v1/super/distributionList",
        method: 'GET',
        //headers: {'Content Type' : 'application/json'}, 
        headers: {'Authorization': 'Bearer ' + token},
        }).success(function(data, status, headers, config){
        return data;
      }).error(function(data, status, headers, config){
        return data; 
      });
    return response;
  }
  
  service.createDistrList = function(formData, token){
	    var response = 
	      $http({
	        url: "https://i-7ad0de8d.workdaysuv.com/ccx/internalapi/emailDList/v1/super/distributionList",
	        data: formData,
	        method: 'POST',
	        transformResponse: function(data){
	          return data;
	        },
	        headers: {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'},
	      }).success(function(data, status, headers, config){
	        return data;
	      }).error(function(data, status, headers, config){
	        return data;
	      });
	    return response;
  };
	  
  service.getWorkers = function(param, token){
//	  console.log("getWorkers token: " + token);
//	  console.log("getWorkers param: " + param);
	    var response = 
	      $http({
	        url: "https://i-7ad0de8d.workdaysuv.com/ccx/api/v1/super/workers?search=" + param,
	        method: 'GET',
	        transformResponse: function(data){
	          return data;
	        },
	        headers: {'Authorization': 'Bearer ' + token}, 
	      }).success(function(data, status, headers, config){
	        return data;
	      }).error(function(data, status, headers, config){
	        return data;
	      });
	    return response;
  };
  
  service.getWorkerDetails = function(id, token){
//	  console.log("getWorkers token: " + token);
//	  console.log("getWorkers param: " + param);
	    var response = 
	      $http({
	        url: "https://i-7ad0de8d.workdaysuv.com/ccx/api/v1/super/workers?search=" + id,
	        method: 'GET',
	        transformResponse: function(data){
	          return data;
	        },
	        headers: {'Authorization': 'Bearer ' + token}, 
	      }).success(function(data, status, headers, config){
	        return data;
	      }).error(function(data, status, headers, config){
	        return data;
	      });
	    return response;
  };
  
  return service;

}]);