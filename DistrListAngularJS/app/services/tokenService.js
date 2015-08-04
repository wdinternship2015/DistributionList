angular.module('DistributionList').factory('tokenService', function(){
  var sharedData = {
    token: ' '
  };
  return {
    getToken: function(){
      return sharedData.token;
    }, 
    setToken: function(token){
      sharedData.token = token;
    }
  }

});
