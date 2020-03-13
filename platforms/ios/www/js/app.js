// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

console.log('++++++ Start pushNotification js file ++++++');

function onPushwooshInitialized(pushNotification) {
    console.log('--- IN onPushwooshInitialized---');
    //if you need push token at a later time you can always get it from Pushwoosh plugin
    pushNotification.getPushToken(
        function(token) {
            console.info('push token: ' + token);
        }
    );

    //and HWID if you want to communicate with Pushwoosh API
    pushNotification.getPushwooshHWID(
        function(token) {
            console.info('Pushwoosh HWID: ' + token);
        }
    );

    //settings tags
    pushNotification.setTags({
            tagName: "tagValue",
            intTagName: 10
        },
        function(status) {
            console.info('setTags success: ' + JSON.stringify(status));
        },
        function(status) {
            console.warn('setTags failed');
        }
    );

    pushNotification.getTags(
        function(status) {
            console.info('getTags success: ' + JSON.stringify(status));
        },
        function(status) {
            console.warn('getTags failed');
        }
    );

    //start geo tracking.
    //pushNotification.startLocationTracking();
}

function initPushwoosh() {
    console.log('--- In initPushwoosh---');
    var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

    //set push notifications handler
    document.addEventListener('push-notification',
        function(event) {
            var message = event.notification.message;
            var userData = event.notification.userdata;

            alert("Push message opened: " + message);
            console.info(JSON.stringify(event.notification));

            //dump custom data to the console if it exists
            if (typeof(userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }
        }
    );

    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({
        appid: "AFC42-4D094",
        projectid: "692021897941",
        serviceName: ""
    });

    //register for push notifications
    pushNotification.registerDevice(
        function(status) {
            alert("registered with token: " + status.pushToken);
            onPushwooshInitialized(pushNotification);
        },
        function(status) {
            alert("failed to register: " + status);
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}


angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services', 'tutorials', 'ngSanitize', 'ApiUrlModule', 'FormSevice', 'encodeDecodeBase64', 'authenticationModule', 'userInfo', 'webStorageSevrice', 'ionic.native', 'leaflet-directive'])

.config(function($ionicConfigProvider, $sceDelegateProvider) {


    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        console.log('--- Call initPushwoosh---');
        initPushwoosh();
    });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

            function stopDrag() {
                $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag() {
                $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function(scope, element, attrs) {
            var href = attrs['hrefInappbrowser'];

            attrs.$observe('hrefInappbrowser', function(val) {
                href = val;
            });

            element.bind('click', function(event) {

                window.open(href, '_system', 'location=yes');

                event.preventDefault();
                event.stopPropagation();

            });
        }
    };
});