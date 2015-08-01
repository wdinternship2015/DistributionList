angular.module('DistributionList').factory('requestService',['$http', function($http){
  var service = {};
  service.getDistrLists = function(token){
    var response = 
      $http({
        url: "https://i-7ad0de8d.workdaysuv.com/ccx/internalapi/emailDList/v1/super/distributionList",
        method: 'POST',
        headers: {'Content Type' : 'application/json'}, 
        }).success(function(data, status, headers, config){
        return data;
      }).error(function(data, status, headers, config){
        return data; 
      });
    return response;
  }
  return service;

}]);
