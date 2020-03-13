/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('FormSevice', [])

.factory('FormidableService', ['$q', '$http', function($q, $http){
    // With this function we get all formidable forms or ant other information- depens on the API url.
	function formidableGetForm(formUrl) {
	    console.log(formUrl);
	    var deferred = $q.defer();
		$http.get(formUrl).then(function(response){
			deferred.resolve(response.data);
		});
		return deferred.promise;
	}

    // Example of Post Object ==> var obj = { "8jhtw": "ale45", "sjiyw": 16 };
	function formidablePostEntry(formEntryUrl, postObject) {
		$http.post(formEntryUrl, postObject).then(function(response){
		    console.log(response);
		});
	}

	// Return this object and pass service functionalities to controller.
	var ret = {
	    getForm: formidableGetForm
	};
	// Return this variable and use in controller.
	return ret;
}]);