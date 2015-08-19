angular.module('DistributionList').factory('requestService',['$http', 'RESTfulAPI', function($http, RESTfulAPI){
  
	var service = {};
  

	service.getAllDLists = function(token) {
		var response = $http({
			url : RESTfulAPI.DListUrl(),
			method : 'GET',
			headers : {'Authorization' : 'Bearer ' + token},
				}).success(function(data, status, headers, config) {
					return data;
				}).error(function(data, status, headers, config) {
					return data;
				});
				return response;
			};
  
  service.createDList = function(formData, token){
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
	        url: RESTfulAPI.workersUrl() + "/" + id,
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
  
  service.getDList = function(param, token){
	    var response = 
	      $http({
	        url: RESTfulAPI.DListUrl() + "/" + param,
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

  service.addMemberToDList = function(member, listId, token){
	    var response = 
	      $http({
	        url: RESTfulAPI.addMemberUrl(listId),
	        data: member,
	        method: 'PUT',
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
  
  service.deleteDList = function(param, token){
	    var response = 
	      $http({
	        url: RESTfulAPI.DListUrl() + "/" + param,
	        method: 'DELETE',
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

  service.editDistrList = function(formData, listId, token){
	    var response = 
	      $http({
	        url: RESTfulAPI.DListUrl() + "/" + listId,
	        data: formData,
	        method: 'PUT',
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

  service.searchByOwners = function(user, token){
	    var response = 
	      $http({
	        url: RESTfulAPI.DListByOwnerUrl(user),
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