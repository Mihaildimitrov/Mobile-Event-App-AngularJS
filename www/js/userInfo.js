/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('userInfo', [])
// This service change status of user (logged or Not)
.factory('UserInfoService', ['$q', '$http', '$rootScope', function($q, $http, $rootScope){
    
    function changeUserState(status) {
        $rootScope.$emit('change-user-status', status);
    }
    
    return {
        changeUserState: changeUserState
    };
    
    
}]);