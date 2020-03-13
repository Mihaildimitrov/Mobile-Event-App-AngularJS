angular.module('webStorageSevrice', [])
// This service change status of user (logged or Not)
.factory('WebStorageSevice', ['$q', '$http', '$rootScope', function($q, $http, $rootScope){
    function isDeviceSupportsWebStorage() {
        if (typeof(Storage) !== "undefined") {
            return true;
        } else {
            return false;
        }
    }    
    
    // This function compares two arrays or objects.
    function isArrayEqual(x, y) {
        //return _(x).differenceWith(y, _.isEqual).isEmpty();
        return _.isEqual(x.sort(), y.sort());
    }
    
    // This function saves data in web storage.
    function setDataInWebStorage(data, postKey) {
        localStorage.setItem(postKey, JSON.stringify(data));
    }
    
    // This function gets data from web storage. 
    function getDataFromWebStorage(postKey) {
        return JSON.parse(localStorage.getItem(postKey));
    }

    
    function getAllPostsFromWebStorage(responseFromServer, postKey) {
        // Check if the device supports Web Storage.
        if (typeof(Storage) !== "undefined") {
            console.log('Your browse supports Web Storage!');
            // Get this post type from web storage, and save in one variable.
            var responseFromWebStorage = getDataFromWebStorage(postKey);
            // Response from Server(WordPress DB).
            // var responseFromServer = responseFromServer;
    
            if(responseFromWebStorage === null) {
                console.log('= Null');
                // Set.
                setDataInWebStorage(responseFromServer, postKey);
                // Get and return data.
                return getDataFromWebStorage(postKey);
            } else {
                console.log('!== Null');
                // Compare.
                if(isArrayEqual(responseFromWebStorage, responseFromServer)) {
                    console.log('is equal');
                    // Get data from web storage and Pass data to controller
                    return getDataFromWebStorage(postKey);
                } else {
                    console.log('is not equal');
                    // First save response from server in web storage.
                    // After that pass this data from web storage to controller.
                    setDataInWebStorage(responseFromServer, postKey);
                    return getDataFromWebStorage(postKey);
                }
            }
        } else {
            console.log("Sorry, your browser does not support Web Storage...");
            return responseFromServer;
        }
    }
    

    return {
        getAllPostsFromWebStorage: getAllPostsFromWebStorage,
        isArrayEqual: isArrayEqual,
        setDataInWebStorage: setDataInWebStorage,
        getDataFromWebStorage: getDataFromWebStorage
    };
}]);