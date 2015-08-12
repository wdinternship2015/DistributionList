angular.module('DistributionList').factory('requestService',['$http', 'RESTfulAPI', function($http, RESTfulAPI){
  var service = {};
  service.getDLists = function(token){
    var response = 
      $http({
        url: RESTfulAPI.DListUrl(),
    	method: 'GET',
        headers: {'Authorization': 'Bearer ' + token},
        }).success(function(data, status, headers, config){
        return data;
      }).error(function(data, status, headers, config){
        return data; 
      });
    return response;
  };
  
  service.createDistrList = function(formData, token){
	    var response = 
	      $http({
	        url: RESTfulAPI.DListUrl(),
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
	    var response = 
	      $http({
	    	url: RESTfulAPI.workersUrl() + "?search=" + param,
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
	    var response = 
	      $http({
	        url: RESTfulAPI.workersUrl() + "?search=" + id,
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
  
  service.searchDLists = function(param, token){
	    var response = 
	      $http({
	        url: RESTfulAPI.DListUrl() + "?search=" + param,
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
  
  service.addMemberToDList = function(member, token){
	    var response = 
	      $http({
	        url: RESTfulAPI.addMemberUrl(),
	        data: member,
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

  return service;

}]);