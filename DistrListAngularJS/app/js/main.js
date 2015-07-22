///Users/britney.wong/angularProj/angular-seed/proj1/app/js 
/**
 * Main AngularJS Web Application
 */
var app = angular.module('DistributionList', [ 'ngRoute', 
        'ownedByMeModule', 'memberOfModule', 'view3Module', 'view4Module', 'view5Module', 
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrlHome"})
    // Pages
    .when("/ownedByMe", {templateUrl: "partials/ownedByMe.html", controller: "ownedByMeCtrl"})
    .when("/memberOf", {templateUrl: "partials/memberOf.html", controller: "memberOfCtrl"})
    .when("/view3", {templateUrl: "partials/view3.html", controller: "PageCtrlView3"})
    .when("/view4", {templateUrl: "partials/view4.html", controller: "PageCtrlView4"})
    .when("/view5", {templateUrl: "partials/view5.html", controller: "PageCtrlView5"})
    .when("/iframe", {templateUrl: "partials/iframes.html", controller: "iframeCtrl"}) 
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrlHome"});
}]);

app.factory('shareDataService', function() {
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

app.directive('authenticate', function($compile, $window, $location){
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


app.directive('getToken', function($location, $window){
  return{
    restrict:'A',
    scope:false, 
    link: function(scope, element, attrs){
      //onload=contentWindow.location.href; 
      element.bind('load', function(){
        var elem = document.querySelector('#iframe1'); 
        alert("Loaded: ");
        console.log(element.contentWindow.location.href);

      });
      console.log("get Token");  
    } 

   }


});

//onload="alert('Loaded ' + contentWindow.location.href)"
        

app.controller('PageCtrlHome', function ($scope,$window,shareDataService) {
  console.log("PageCtrlHome reporting for duty.");
  var jsonObj = JSON.parse(testWorkers);
  $scope.total = jsonObj.total;
  $scope.workers = jsonObj.data;
  $scope.datasize = $scope.workers.length;
  shareDataService.set($scope.workers);
  $scope.token = "";
  $window.load = function(){
   var element = document.querySelector('#iframe1'); 
   //alert("Loading");
   //alert("in controller: " + element.contentWindow.location.href);
   var url = element.contentWindow.location.href; 
   if(url.indexOf("#") >= 0){
     var split1 = url.split("=");
     var split2 = split1[1].split("&");
     var token = split2[0];
     console.log(token);
     $scope.token = token; 
     element.style.display="none";
     document.querySelector('#iframe2').style.display = "block";
   }
   console.log(token);
  }
});











var testWorkers = '{"total":4039,"data":[{"descriptor":"1099 Analyst_500.1","id":"ad3b6e21b21b100301e6c888e90816da","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/ad3b6e21b21b100301e6c888e90816da","primaryWorkEmail":"TestWorkEmail@workday.com","isManager":false,"businessTitle":"1099 Analyst","primarySupervisoryOrganization":{"descriptor":"4300 Payroll (For BFT use)","id":"31fd8a267e4b4375aa8ff594033193cf","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/31fd8a267e4b4375aa8ff594033193cf"}},{"descriptor":"1099 Analyst_500.3","id":"ad3b6e21b21b1003033921725a881dbc","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/ad3b6e21b21b1003033921725a881dbc","primaryWorkEmail":"TestWorkEmail@workday.com","isManager":false,"businessTitle":"1099 Analyst","primarySupervisoryOrganization":{"descriptor":"4300 Payroll (For BFT use)","id":"31fd8a267e4b4375aa8ff594033193cf","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/31fd8a267e4b4375aa8ff594033193cf"}},{"descriptor":"1099 Analyst_A200.1","id":"e2a8397339e710494280aa021175071c","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/e2a8397339e710494280aa021175071c","primaryWorkEmail":"TestWorkEmail@workday.com","primaryWorkPhone":"+1 (617) 354-4503","isManager":false,"businessTitle":"1099 Analyst","primarySupervisoryOrganization":{"descriptor":"A26540 Payroll","id":"32b20a71063d1042be213b147a350118","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/32b20a71063d1042be213b147a350118"}},{"descriptor":"1099 Analyst_A200.2","id":"2689285da4061049a29713ea308d34a3","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/2689285da4061049a29713ea308d34a3","primaryWorkEmail":"TestWorkEmail@workday.com","isManager":false,"businessTitle":"1099 Analyst","primarySupervisoryOrganization":{"descriptor":"A26540 Payroll","id":"32b20a71063d1042be213b147a350118","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/32b20a71063d1042be213b147a350118"}},{"descriptor":"1Taxrecord UKMP45","id":"936fdd0568cd102f5afb210d87393518","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/936fdd0568cd102f5afb210d87393518","isManager":false,"businessTitle":"Staff Payroll Specialist","primarySupervisoryOrganization":{"descriptor":"6318 Global Support - UK","id":"bf63ab9d32a61043be1e3d4a008d02e3","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/bf63ab9d32a61043be1e3d4a008d02e3"}},{"descriptor":"1Taxrecord UKWP45","id":"936fdd0568cd102f5afca537afe03650","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/936fdd0568cd102f5afca537afe03650","isManager":false,"businessTitle":"Staff Payroll Specialist","primarySupervisoryOrganization":{"descriptor":"6318 Global Support - UK","id":"bf63ab9d32a61043be1e3d4a008d02e3","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/bf63ab9d32a61043be1e3d4a008d02e3"}},{"descriptor":"2Taxrecord UKMP45","id":"936fdd0568cd102f5afb3d11abec3530","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/936fdd0568cd102f5afb3d11abec3530","isManager":false,"businessTitle":"Staff Payroll Specialist","primarySupervisoryOrganization":{"descriptor":"6318 Global Support - UK","id":"bf63ab9d32a61043be1e3d4a008d02e3","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/bf63ab9d32a61043be1e3d4a008d02e3"}},{"descriptor":"2Taxrecord UKWP45","id":"936fdd0568cd102f5afcc499e5793668","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/936fdd0568cd102f5afcc499e5793668","isManager":false,"businessTitle":"Staff Payroll Specialist","primarySupervisoryOrganization":{"descriptor":"6318 Global Support - UK","id":"bf63ab9d32a61043be1e3d4a008d02e3","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/bf63ab9d32a61043be1e3d4a008d02e3"}},{"descriptor":"AB Monthly Family Maintenance 2002 2","id":"c4174dc0cbd1102e0262b3f49c722776","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/c4174dc0cbd1102e0262b3f49c722776","isManager":false,"businessTitle":"Administrative Assistant","primarySupervisoryOrganization":{"descriptor":"3316 Payroll IWO (CAN)","id":"c43bcfde6bb7100b652d2eb81a6a3384","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/c43bcfde6bb7100b652d2eb81a6a3384"}},{"descriptor":"AB Monthly Family Maintenance 2005 2","id":"c4174dc0cbd1102e0262c5939cda2794","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/c4174dc0cbd1102e0262c5939cda2794","isManager":false,"businessTitle":"Administrative Assistant","primarySupervisoryOrganization":{"descriptor":"3316 Payroll IWO (CAN)","id":"c43bcfde6bb7100b652d2eb81a6a3384","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/c43bcfde6bb7100b652d2eb81a6a3384"}},{"descriptor":"AB Monthly Garnishment 2","id":"c4174dc0cbd1102e0262d8c2d26227b2","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/c4174dc0cbd1102e0262d8c2d26227b2","isManager":false,"businessTitle":"Administrative Assistant","primarySupervisoryOrganization":{"descriptor":"3316 Payroll IWO (CAN)","id":"c43bcfde6bb7100b652d2eb81a6a3384","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/c43bcfde6bb7100b652d2eb81a6a3384"}},{"descriptor":"AB Weekly Family Maintenance 2002 1","id":"c4174dc0cbd1102e0262e942a34227d0","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/c4174dc0cbd1102e0262e942a34227d0","isManager":false,"businessTitle":"Administrative Assistant","primarySupervisoryOrganization":{"descriptor":"3316 Payroll IWO (CAN)","id":"c43bcfde6bb7100b652d2eb81a6a3384","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/c43bcfde6bb7100b652d2eb81a6a3384"}},{"descriptor":"AB Weekly Family Maintenance 2005 1","id":"c4174dc0cbd1102e0262fac54dc227ee","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/c4174dc0cbd1102e0262fac54dc227ee","isManager":false,"businessTitle":"Administrative Assistant","primarySupervisoryOrganization":{"descriptor":"3316 Payroll IWO (CAN)","id":"c43bcfde6bb7100b652d2eb81a6a3384","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/c43bcfde6bb7100b652d2eb81a6a3384"}},{"descriptor":"AB Weekly Garnishment 1 - CRF Auto","id":"c4174dc0cbd1102e026314901a2a280c","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/c4174dc0cbd1102e026314901a2a280c","isManager":false,"businessTitle":"Administrative Assistant","primarySupervisoryOrganization":{"descriptor":"3316 Payroll IWO (CAN)","id":"c43bcfde6bb7100b652d2eb81a6a3384","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/c43bcfde6bb7100b652d2eb81a6a3384"}},{"descriptor":"ACA FT Hourly CA NEWorker 16","id":"1da763b87b6c103c20f2c8c4857d4617","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/1da763b87b6c103c20f2c8c4857d4617","primaryWorkEmail":"TestWorkEmail@workday.com","isManager":false,"businessTitle":"ACA Hourly Staff","primarySupervisoryOrganization":{"descriptor":"3314 Tax","id":"2eace1eb4d9a4ef48dd74cd5bd8906d9","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/2eace1eb4d9a4ef48dd74cd5bd8906d9"}},{"descriptor":"ACA FT Hourly CA NEWorker 17","id":"1da763b87b6c103c20f2dccf8c75462d","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/1da763b87b6c103c20f2dccf8c75462d","primaryWorkEmail":"TestWorkEmail@workday.com","isManager":false,"businessTitle":"ACA Hourly Staff","primarySupervisoryOrganization":{"descriptor":"3314 Tax","id":"2eace1eb4d9a4ef48dd74cd5bd8906d9","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/2eace1eb4d9a4ef48dd74cd5bd8906d9"}},{"descriptor":"ACA FT Hourly CA NEWorker 19","id":"1da763b87b6c103c20f3003acb4d4659","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/1da763b87b6c103c20f3003acb4d4659","primaryWorkEmail":"TestWorkEmail@workday.com","isManager":false,"businessTitle":"ACA Hourly Staff","primarySupervisoryOrganization":{"descriptor":"3314 Tax","id":"2eace1eb4d9a4ef48dd74cd5bd8906d9","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/2eace1eb4d9a4ef48dd74cd5bd8906d9"}},{"descriptor":"ACA FT Salaried AK EWorker 21","id":"1da763b87b6c103c20f32169e5654685","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/workers/1da763b87b6c103c20f32169e5654685","primaryWorkEmail":"TestWorkEmail@workday.com","isManager":false,"businessTitle":"ACA Management Staff","primarySupervisoryOrganization":{"descriptor":"5000 Information Technology","id":"e50d309a6d8540e3b533219cfa2c330b","href":"https://i-0caa36fb.workdaysuv.com/ccx/api/v1/super/supervisoryOrganizations/e50d309a6d8540e3b533219cfa2c330b"}}]}';