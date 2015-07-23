 angular.module('DistributionList').factory('shareDataService', function() {
	 var savedData = {};
	 
	 var set = function (data) {
	   savedData = data;
	 };
	 
	 var get = function () {
	  return savedData;
	 };

	 var pickedGroup = {};
	 var setPickedGroup = function (data) {
		 pickedGroup = data;
	 };
	 var getPickedGroup = function () {
	  return pickedGroup;
	 };

	 var searchResult = {}; 
	 var setSearchResult = function (data) {
		 searchResult = data;
	 };
	 var getSearchResult = function () {
	  return searchResult;
	 };
	 
	 var token = {};
	 
	 var setToken = function (data) {
	   savedData = data;
	 };
	 
	 var getToken = function () {
	  return savedData;
	 };
	 return {
	  set: set,
	  get: get,
	  setPickedGroup: setPickedGroup,
	  getPickedGroup: getPickedGroup,
	  setSearchResult: setSearchResult,
	  getSearchResult: getSearchResult,
	  setToken: setToken,
	  getToken: getToken,
	 }
	 
});