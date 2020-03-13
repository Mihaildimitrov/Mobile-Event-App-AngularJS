angular.module('ApiUrlModule', [])
// In this module we will keep our API urls.
// Just add your new api url in ret (Object) and after that use in http function.
.factory('ApiUrl', ['$q', '$http', '$rootScope', function($q, $http, $rootScope){
    // API_Url for your Web Application.
	// Return this object and pass access to all API urls.
    return {
        // Users:
        users: ["https://13367.de/wp-json/wp/v2/users?per_page=100", "users"],
        wordPressApiUrl: "https://13367.de/api/",
        
        // Post types:
        speakersUrl: ["https://13367.de/wp-json/wp/v2/speakers?per_page=100", "speakers"],
        speakerUrl: ["https://13367.de/wp-json/wp/v2/speakers/", "speakers"],
        sessionsUrl: ["https://13367.de/wp-json/wp/v2/schedule?per_page=100", "sessions"],
        sessionUrl: ["https://13367.de/wp-json/wp/v2/schedule/", "sessions"],
        sponsorsUrl: ["https://13367.de/wp-json/wp/v2/sponsors?per_page=100", "sponsors"],
        sponsorUrl: ["https://13367.de/wp-json/wp/v2/sponsors/", "sponsors"],
        exhibitorsUrl: ["https://13367.de/wp-json/wp/v2/exhibitors?per_page=100", "exhibitors"],
        exhibitorUrl: ["https://13367.de/wp-json/wp/v2/exhibitors/", "exhibitors"],
        
        //Formidable APIs:
        formidableFormHtml: "https://13367.de/wp-json/frm/v2/forms/15?return=html",
        formidableForm: "https://13367.de/wp-json/frm/v2/forms/8/fields",
        formidableAllForms: "https://13367.de/wp-json/frm/v2/forms"
        
        // Woocommerce API Urls:
    };
}]);