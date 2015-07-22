angular.module('iframeModule', []).controller('iframeCtrl', function($scope){


});


angular.module('iframeModule').directive('authenticate', function($compile, $window, $location){
  return{
    restrict: 'AE',
    scope: false,
    //template:'<a href="https://i-e0efe117.workdaysuv.com/super/authorize?response_type=token&client_id=MjA0YjQzY2UtMDQ2Yy00ZTQ5LTg0NGEtY2I4M2QzMjM4Njgy" ng-click="submit()"></a>',    
    link: function(scope, element, attrs){
      element.on('click', function(onClickEvent){
        angular.element(document.querySelector('#testbutton')).append($compile('<a id=token href="https://i-e0efe117.workdaysuv.com/super/authorize?response_type=token&client_id=MjA0YjQzY2UtMDQ2Yy00ZTQ5LTg0NGEtY2I4M2QzMjM4Njgy" onClick="return false;"></a>')(scope));
        var elem = document.querySelector('#token');
        elem.click();
        var bearer_token = elem.attributes['href'].value;
        alert(bearer_token);
        //var bearer_token = $location.absUrl(); 
        //alert(bearer_token);
        //console.log(bearer_token);
        return false;
      });
    }

  };

});
