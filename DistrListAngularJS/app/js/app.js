/**
 * DistributionList app definition and configuration
 */

var app = angular.module('DistributionList', [ 'ngStorage', 'myDListModule', 'searchListModule' , 'ngIdle' , 'ui.bootstrap' ]);

angular.module('myDListModule', [ 'ngStorage', 'checklist-model' ]);
angular.module('searchListModule', [ 'ngStorage', 'checklist-model' ]);


//idle logout config
app.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
	  IdleProvider.idle(10);  //seconds
	  IdleProvider.timeout(5*60); //seconds
//	  KeepaliveProvider.interval(10);
}]);

