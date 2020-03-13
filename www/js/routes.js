angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.wTC2017', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/wTC2017.html',
        controller: 'wTC2017Ctrl'
      }
    }
  })

  .state('menu.schedule', {
    url: '/schedule',
    views: {
      'side-menu21': {
        templateUrl: 'templates/schedule.html',
        controller: 'scheduleCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.sponsors', {
    url: '/sponsors',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sponsors.html',
        controller: 'sponsorsCtrl'
      }
    }
  })

  .state('menu.exhibitors', {
    url: '/exhibitors',
    views: {
      'side-menu21': {
        templateUrl: 'templates/exhibitors.html',
        controller: 'exhibitorsCtrl'
      }
    }
  })

  .state('menu.committee', {
    url: '/committee',
    views: {
      'side-menu21': {
        templateUrl: 'templates/committee.html',
        controller: 'committeeCtrl'
      }
    }
  })

  .state('menu.contact', {
    url: '/contact',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
      }
    }
  })

  .state('menu.info', {
    url: '/info',
    views: {
      'side-menu21': {
        templateUrl: 'templates/info.html',
        controller: 'infoCtrl'
      }
    }
  })

  .state('menu.floorplan', {
    url: '/floorplan',
    views: {
      'side-menu21': {
        templateUrl: 'templates/floorplan.html',
        controller: 'floorplanCtrl'
      }
    }
  })

  .state('menu.notifications', {
    url: '/notifications',
    views: {
      'side-menu21': {
        templateUrl: 'templates/notifications.html',
        controller: 'notificationsCtrl'
      }
    }
  })

  .state('menu.search', {
    url: '/search',
    views: {
      'side-menu21': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('menu.speakers', {
    url: '/speakers',
    views: {
      'side-menu21': {
        templateUrl: 'templates/speakers.html',
        controller: 'speakersCtrl'
      }
    }
  })

  .state('menu.speaker', {
    url: '/speakerinfo',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/speaker.html',
        controller: 'speakerCtrl'
      }
    }
  })

  .state('menu.sponsor', {
    url: '/sponsordetails',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/sponsor.html',
        controller: 'sponsorCtrl'
      }
    }
  })

  .state('menu.session', {
    url: '/session',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/session.html',
        controller: 'sessionCtrl'
      }
    }
  })

  .state('menu.exhibitor', {
    url: '/exhibitorsdetails',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/exhibitor.html',
        controller: 'exhibitorCtrl'
      }
    }
  })

  .state('menu.welcomeMessage', {
    url: '/welcomemessage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/welcomeMessage.html',
        controller: 'welcomeMessageCtrl'
      }
    }
  })

  .state('myAccount', {
    url: '/myaccount',
    templateUrl: 'templates/myAccount.html',
    controller: 'myAccountCtrl'
  })

  .state('menu.news', {
    url: '/news',
    views: {
      'side-menu21': {
        templateUrl: 'templates/news.html',
        controller: 'newsCtrl'
      }
    }
  })

  .state('menu.survey', {
    url: '/survey',
    views: {
      'side-menu21': {
        templateUrl: 'templates/survey.html',
        controller: 'surveyCtrl'
      }
    }
  })

  .state('menu.socialNetworks', {
    url: '/socialnetwork',
    views: {
      'side-menu21': {
        templateUrl: 'templates/socialNetworks.html',
        controller: 'socialNetworksCtrl'
      }
    }
  })

  .state('menu.videos', {
    url: '/video',
    views: {
      'side-menu21': {
        templateUrl: 'templates/videos.html',
        controller: 'videosCtrl'
      }
    }
  })

  .state('menu.bookmarks', {
    url: '/bookmarks',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bookmarks.html',
        controller: 'bookmarksCtrl'
      }
    }
  })

  .state('myNotes', {
    url: '/mynotes',
    templateUrl: 'templates/myNotes.html',
    controller: 'myNotesCtrl'
  })

  .state('menu.gallery', {
    url: '/gallery',
    views: {
      'side-menu21': {
        templateUrl: 'templates/gallery.html',
        controller: 'galleryCtrl'
      }
    }
  })

  .state('menu.video', {
    url: '/singlevideo',
	params: {
		videokey: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/video.html',
        controller: 'videoCtrl'
      }
    }
  })

  .state('menu.abstract', {
    url: '/abstract',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/abstract.html',
        controller: 'abstractCtrl'
      }
    }
  })

  .state('menu.googleMap', {
    url: '/googlemap',
    views: {
      'side-menu21': {
        templateUrl: 'templates/googleMap.html',
        controller: 'googleMapCtrl'
      }
    }
  })

  .state('menu.wpLogin', {
    url: '/wplogin',
    views: {
      'side-menu21': {
        templateUrl: 'templates/wpLogin.html',
        controller: 'wpLoginCtrl'
      }
    }
  })

  .state('menu.forgotPassword', {
    url: '/forgotpass',
    views: {
      'side-menu21': {
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotPasswordCtrl'
      }
    }
  })

  .state('menu.registration', {
    url: '/registration',
    views: {
      'side-menu21': {
        templateUrl: 'templates/registration.html',
        controller: 'registrationCtrl'
      }
    }
  })

  .state('menu.formidableForm', {
    url: '/formidableform',
    views: {
      'side-menu21': {
        templateUrl: 'templates/formidableForm.html',
        controller: 'formidableFormCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/home')

  

});