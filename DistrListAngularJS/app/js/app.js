var app = angular.module('DistributionList', ['ui.bootstrap']); 
function pingServerGET(){
     var xhr = new XMLHttpRequest();
     xhr.open('GET', 'http://localhost:8080/DistributionListJersey/webapi/testResponse/GET');
     xhr.onload = function() {
     	if (xhr.status == 200) {
     		var msg = xhr.responseText;
     		alert('success ' + msg);
      	}         	
       };
       xhr.onerror = function() {
         alert('Woops, there was an error making the request.');
       };
     xhr.send();
}

function pingServerPOST(){
	var xhr = new XMLHttpRequest();
	var param = "name=blah";
	xhr.open('POST', 'http://localhost:8080/DistributionListJersey/webapi/testResponse/POST', true);
	xhr.onload = function() {
         alert('success ' + xhr.responseText);
   };
   xhr.onerror = function() {
     alert('Woops, there was an error making the request.' + xhr.responseText);
   };
 xhr.send(param);
}

