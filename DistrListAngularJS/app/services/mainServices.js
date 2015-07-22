
//factory to receive the token to make calls to Workday REST server 
angular.module('DistributionList').factory('tokenService', ['$http', function($http){
  var tokenFactory = {};
  tokenFactory.getToken = function(){
    var response = 
    $http({
      url:"https://i-e0efe117.workdaysuv.com/super/authorize?response_type=token&client_id=MjA0YjQzY2UtMDQ2Yy00ZTQ5LTg0NGEtY2I4M2QzMjM4Njgy",
      data:{}, 
      method:'GET', 
      transformResponse:function(data){
        return data;
      },
      headers:{'Content-Type': undefined}, 
    }).success(function(data, status, headers, config){
       return data;
    }).error(function(data, status, headers, confif){
       return data; 
    });
    return response; 
   };
  return tokenFactory; 

}]);
