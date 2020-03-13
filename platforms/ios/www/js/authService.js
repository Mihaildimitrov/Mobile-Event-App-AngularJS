angular.module('authenticationModule', [])

// WP AUTHENTICATION RELATED FUNCTIONS
.service('AuthService', ['$rootScope', '$http', '$q', 'ApiUrl', 'UserInfoService', function ($rootScope, $http, $q, ApiUrl, UserInfoService){

    this.validateAuth = function(user) {
        var deferred = $q.defer();
        $http.jsonp(ApiUrl.wordPressApiUrl +
        'user/validate_auth_cookie/' +
        '?cookie='+ user.cookie +
        '&insecure=cool' +
        '&callback=JSON_CALLBACK')
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    this.doLogin = function(user) {
        var deferred = $q.defer(),
            nonce_dfd = $q.defer(),
            authService = this;
    
        authService.requestNonce("user", "generate_auth_cookie")
        .then(function(nonce){
            nonce_dfd.resolve(nonce);
        });
    
        nonce_dfd.promise.then(function(nonce){
        //now that we have the nonce, ask for the new cookie
            authService.generateAuthCookie(user.userName, user.password, nonce)
            .then(function(data) {
                if (data.status == "error"){
                    console.log('generateAuthCookie -> error');
                    // return error message
                    UserInfoService.changeUserState(false);
                    deferred.reject(data.error);
                } else {
                    console.log('generateAuthCookie -> OK');
                    //recieve and store the user's cookie in the local storage
                    var user = {
                        cookie: data.cookie,
                        data: data.user,
                        user_id: data.user.id
                    };
                    authService.saveUser(user);
                    UserInfoService.changeUserState(true);
                    deferred.resolve(user);
                    
                        // !!! USE THIS ONLY WITH "BUDDYPRESS" !!!
                        //getavatar in full size
                        // authService.updateUserAvatar().then(function(){
                        //     deferred.resolve(user);
                        // });
                }
            });
        });
        return deferred.promise;
    };

    this.doRegister = function(user) {
        var deferred = $q.defer(),
            nonce_dfd = $q.defer(),
            authService = this;
    
        authService.requestNonce("user", "register")
        .then(function(nonce){
            nonce_dfd.resolve(nonce);
        });
    
        nonce_dfd.promise.then(function(nonce){
            authService.registerUser(user.userName, user.email, user.displayName, user.password, nonce)
            .then(function(data){
                if (data.status == "error") {
                    // return error message
                    deferred.reject(data.error);
                } else {
                    // in order to get all user data we need to call this function
                    // because the register does not provide user data
                    authService.doLogin(user).then(function(){
                        deferred.resolve(user);
                    });
                }
            });
        });
        return deferred.promise;
    };

    this.requestNonce = function(controller, method) {
        var deferred = $q.defer();
    
        $http.jsonp(ApiUrl.wordPressApiUrl + 'get_nonce/' +
        '?controller=' + controller +
        '&method=' + method +
        '&insecure=cool' +
        '&callback=JSON_CALLBACK')
        .success(function(data) {
            deferred.resolve(data.nonce);
        })
        .error(function(data, err) {
            if (data && data.nonce){
                deferred.reject(data.nonce);
            } else{
                deferred.reject(err);
            }
        });
        return deferred.promise;
    };

    this.doForgotPassword = function(username) {
        var deferred = $q.defer();
        $http.jsonp(ApiUrl.wordPressApiUrl + 'user/retrieve_password/' +
        '?user_login='+ username +
        '&insecure=cool' +
        '&callback=JSON_CALLBACK')
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    this.generateAuthCookie = function(username, password, nonce) {
        var deferred = $q.defer();
        $http.jsonp(ApiUrl.wordPressApiUrl + 'user/generate_auth_cookie/' +
        '?username='+ username +
        '&password=' + password +
        '&insecure=cool' +
        '&nonce='+ nonce +
        '&callback=JSON_CALLBACK')
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    this.saveUser = function(user){
        window.localStorage.ionWordpress_user = JSON.stringify(user);
    };

    this.getUser = function(){
    
        var data = (window.localStorage.ionWordpress_user) ? JSON.parse(window.localStorage.ionWordpress_user).data : null,
            cookie = (window.localStorage.ionWordpress_user) ? JSON.parse(window.localStorage.ionWordpress_user).cookie : null;
    
        return {
            avatar : JSON.parse(window.localStorage.ionWordpress_user_avatar || null),
            data: data,
            cookie: cookie
        };
    };

    this.registerUser = function(username, email, displayName, password, nonce) {
        var deferred = $q.defer();
        $http.jsonp(ApiUrl.wordPressApiUrl + 'user/register/' +
        '?username='+ username +
        '&email=' + email +
        '&display_name='+ displayName +
        '&user_pass=' + password +
        '&nonce='+ nonce +
        '&insecure=cool' +
        '&callback=JSON_CALLBACK')
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    this.userIsLoggedIn = function(){
        var deferred = $q.defer();
    
        var user = JSON.parse(window.localStorage.ionWordpress_user || null);
        if (user !== null && user.cookie !== null) {
            this.validateAuth(user).then(function(data){
                UserInfoService.changeUserState(true);
                deferred.resolve(data.valid);
            });
        } else {
            UserInfoService.changeUserState(false);
            deferred.resolve(false);
        }
        return deferred.promise;
    };

    this.logOut = function() {
        //empty user data
        
        window.localStorage.ionWordpress_user = null;
        window.localStorage.ionWordpress_user_avatar = null;
        UserInfoService.changeUserState(false);
        // window.localStorage.ionWordpress_bookmarks = null;
    };
    
    // ************* !!! ********************
    // !!! USE THIS ONLY WITH "BUDDYPRESS" !!!
    
    //update user avatar from WP
    // this.updateUserAvatar = function() {
    //     console.log('---IN updateUserAvatar------');
    //     var avatar_dfd = $q.defer(),
    //         authService = this,
    //         user = JSON.parse(window.localStorage.ionWordpress_user || null);
    
    //     $http.jsonp(ApiUrl.wordPressApiUrl + 'user/get_avatar/' +
    //     '?user_id='+ user.user_id +
    //     '&insecure=cool' +
    //     '&type=full' +
    //     '&callback=JSON_CALLBACK')
    //     .success(function(data) {
    //         console.log('---response/data------');
    //         console.log(data);
    //         console.log(data.avatar);
    //         console.log('***********************');
    //         var avatar_aux = data.avatar.replace("http:", "");
    //         var avatar = 'http:' + avatar_aux;
            
    //         window.localStorage.ionWordpress_user_avatar =  JSON.stringify(avatar);
            
    //         avatar_dfd.resolve(avatar);
    //     })
    //     .error(function(err) {
    //         avatar_dfd.reject(err);
    //     });
    //     return avatar_dfd.promise;
    // };
    
}]);