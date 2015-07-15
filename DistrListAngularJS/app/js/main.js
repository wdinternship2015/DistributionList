
/**
 * Main AngularJS Web Application
 */
var app = angular.module('DistributionList', [ 'ngRoute', 
        'view1Module', 'view2Module', 'view3Module', 'view4Module', 'view5Module', 
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrlHome"})
    // Pages
    .when("/view1", {templateUrl: "partials/view1.html", controller: "PageCtrlView1"})
    .when("/view2", {templateUrl: "partials/view2.html", controller: "PageCtrlView2"})
    .when("/view3", {templateUrl: "partials/view3.html", controller: "PageCtrlView3"})
    .when("/view4", {templateUrl: "partials/view4.html", controller: "PageCtrlView4"})
    .when("/view5", {templateUrl: "partials/view5.html", controller: "PageCtrlView5"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrlHome"});
}]);



app.controller('PageCtrlHome', function (/* $scope, $location, $http */) {
  console.log("PageCtrlHome reporting for duty.");

});
