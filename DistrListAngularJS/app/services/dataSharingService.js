 angular.module('DistributionList').factory('shareDataService', function() {

	 var myListStr;	 
	 var setMyListStr = function (data) {
		 myListStr = data;
	 };
	 
	 var getMyListStr = function () {
	  return myListStr;
	 };

	 var memberOfStr;	 
	 var setMemberOfStr = function (data) {
		 memberOfStr = data;
	 };
	 
	 var getMemberOfStr = function () {
	  return memberOfStr;
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
	 	 
	 
	 return {
		 setMyListStr: setMyListStr,
		 getMyListStr: getMyListStr,
		 setMemberOfStr: setMemberOfStr,
		 getMemberOfStr: getMemberOfStr,
		 setPickedGroup: setPickedGroup,
		 getPickedGroup: getPickedGroup,
		 setSearchResult: setSearchResult,
		 getSearchResult: getSearchResult,
	 }
	 
});
