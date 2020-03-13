angular.module('app.services', [])

.factory('PostTypeService', ['$q', '$http', 'WebStorageSevice', function($q, $http, WebStorageSevice){
    // With this function we get all data for current post type from WordPress DB.
	function getAllPosts(postApiUrl) {
		var deferred = $q.defer();
		// postApiUrl[1] is contains which type do you search.
		$http.get(postApiUrl[0]).then(function(response){
			console.log(response);

			deferred.resolve(WebStorageSevice.getAllPostsFromWebStorage(response.data, postApiUrl[1]));

		});
		return deferred.promise;
	}
	// With this function we get all information for current post item from WordPress DB.
	function getPostDetails (postApiUrl, singlePostId) {
    	var deferred = $q.defer();
    	// postApiUrl[1] is contains which type do you search.
		var postDetails = WebStorageSevice.getDataFromWebStorage(postApiUrl[1]);
		
		_.each(postDetails, function(val, key) {
            if(postDetails[key].id == singlePostId) {
                console.log(postDetails[key]);
                deferred.resolve(postDetails[key]);
            }
        });
		return deferred.promise;
    }
    // Make POST HTTP request.
    // Example data ==> { "title": "My first post!" };
	function addPostItem(postApiUrl, postObject) {
	    var deferred = $q.defer();
		$http.post(postApiUrl, postObject).then(function(response){
			deferred.resolve(response.data);
		});
		return deferred.promise;
	}
	
	
	// Return this object and pass service functionalities to controller.
	// Use this in controller.
	var ret = {
		getPosts: getAllPosts,
		getPost: getPostDetails,
		addPost: addPostItem
	};
	// Return this variable and use in controller.
	return ret;
}])

.factory('AllDataService', ['$q', '$http', function($q, $http){
    var allData = {
        speakers: [],
        sponsors: [],
        sessions: [],
        exhibitors: []
    };
    // API_Url for your post.
	var speakersApiUrl = "https://13367.de/wp-json/wp/v2/speakers?per_page=100";
	var sponsorsApiUrl = "https://13367.de/wp-json/wp/v2/sponsors?per_page=100";
	var scheduleApiUrl = "https://13367.de/wp-json/wp/v2/schedule?per_page=100";
	var exhibitorsApiUrl = "https://13367.de/wp-json/wp/v2/exhibitors?per_page=100";
	

    // With this function we get all data from WordPress DB.
	function getAllDataSpeakers() {
	    var deferred = $q.defer();
		$http.get(speakersApiUrl).then(function(res){
			allData.speakers = res.data;
			deferred.resolve(res.data);
		});
		return deferred.promise;
	}
	function getAllDataSponsors() {
	    var deferred = $q.defer();
		$http.get(sponsorsApiUrl).then(function(res){
			allData.sponsors = res.data;
			deferred.resolve(res.data);
		});
		return deferred.promise;
	}
	function getAllDataSessions() {
	    var deferred = $q.defer();
		$http.get(scheduleApiUrl).then(function(res){
			allData.sessions = res.data;
			deferred.resolve(res.data);
		});
		return deferred.promise;
	}
	function getAllDataExhibitors() {
	    var deferred = $q.defer();
		$http.get(exhibitorsApiUrl).then(function(res){
			allData.exhibitors = res.data;
			deferred.resolve(res.data);
		});
		return deferred.promise;
	}
	
// 	getAllDataSpeakers();
// 	getAllDataSponsors();
// 	getAllDataSessions();
// 	getAllDataExhibitors();
	
	function callAllServiceFunctions() {
		getAllDataSpeakers();
		getAllDataSponsors();
		getAllDataSessions();
		getAllDataExhibitors();
	}
	//callAllServiceFunctions();
	
	// Return this object and pass service functionalities to controller.
	var ret = {
		getData: callAllServiceFunctions,
		getDataVariable: allData,
		speakers: getAllDataSpeakers,
		sponsors: getAllDataSponsors,
		sessions: getAllDataSessions,
		exhibitors: getAllDataExhibitors
	};
	// Return this variable and use in controller.
	return ret;
}]);

// .service('BlankService', [function(){

// }]);