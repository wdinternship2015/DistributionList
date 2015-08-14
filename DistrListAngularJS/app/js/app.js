/**
 * DistributionList app definition and configuration
 */

var app = angular.module('DistributionList', [ 'ngStorage', 'myDListModule', 'searchListModule' , 'ngIdle' , 'ui.bootstrap' , 'angular-confirm']);

angular.module('myDListModule', [ 'ngStorage', 'checklist-model' , 'ui.bootstrap', 'angular-confirm']);
angular.module('searchListModule', [ 'ngStorage', 'checklist-model' , 'ui.bootstrap', 'angular-confirm']);


//idle logout config
app.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
	  IdleProvider.idle(10);  //seconds
	  IdleProvider.timeout(5*60); //seconds
//	  KeepaliveProvider.interval(10);
}]);

