angular.module('app.controllers', [])

.controller('wTC2017Ctrl', ['$scope', '$stateParams', '$state', '$ionicLoading', 'AuthService', '$rootScope', 'UserInfoService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicLoading, AuthService, $rootScope, UserInfoService) {
        AuthService.userIsLoggedIn().then(function(response) {
            if (response === true) {
                //update user avatar and go on
                //AuthService.updateUserAvatar();
                console.log('--> OK. We have some user here :) !');
            } else {
                console.log('--> Go to login.. NOW ;) !!!');
                $state.go('menu.wpLogin');
            }
        });
    }
])

.controller('scheduleCtrl', ['$scope', '$stateParams', '$timeout', '$rootScope', '$q', 'PostTypeService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $timeout, $rootScope, $q, PostTypeService, ApiUrl) {
        //var sessionsApiUrl = "https://13367.de/wp-json/wp/v2/schedule?per_page=100";
        //  name: title.rendered
        // 	sessionDescription: content.rendered
        // 	startTime: acf.start_time
        // 	endTime: acf.end_time
        // 	speakers: acf.speaker_connection
        // 	sessionId: id
        // 	location: locations
        // 	day: day
        console.log('-----------Sessions list---------');
        // For Dividers:
        $scope.dividerFunction = function(key) {
            return key;
        };

        function removeElementsByClass(className) {
            var elements = document.getElementsByClassName("divider-element");
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }
        }

        // Show/hide days slider:
        $scope.daysSlider = true;
        // Show hide search menu.
        $scope.showSearchMenu = false;
        $scope.showSearch = function() {
            if ($scope.showSearchMenu === false) {
                $scope.showSearchMenu = true;
                // hide days slider:
                $scope.daysSlider = false;
                $scope.data.day = '';
                removeElementsByClass();
                $rootScope.$emit('change-divide-key', "");
                $scope.allSessions = [];
            } else {
                $scope.showSearchMenu = false;
                // Show days slider:
                $scope.daysSlider = true;
                $scope.data.day = $scope.days[0].id;
                $scope.data.room = '';
                $scope.activeSection = 1;
                removeElementsByClass();
                $rootScope.$emit('change-divide-key', "");
                $scope.allSessions = [];
                $scope.searchData();
            }
        };

        // TO DO !!! ?????????????????????????????????????? <---------------------
        // Should comes from API
        // All days taxonomies.
        $scope.days = [
            { 'id': 4, 'label': 'Arrival Day' },
            { 'id': 5, 'label': 'Day 1' },
            { 'id': 6, 'label': 'Day 2' },
            { 'id': 7, 'label': 'Day 3' },
            { 'id': 8, 'label': 'Final Day' }
        ];

        // All room taxonomies.
        $scope.rooms = [
            { 'id': 9, 'label': 'Room A' },
            { 'id': 10, 'label': 'Room B' },
            { 'id': 11, 'label': 'Room C' },
            { 'id': 12, 'label': 'Room D' },
            { 'id': 13, 'label': 'Room E' }
        ];

        $scope.data = {
            // room: $scope.rooms[0].id,
            room: '',
            day: $scope.days[0].id,
            searchWord: ''
        };
        // GEt all Data from service.
        PostTypeService.getPosts(ApiUrl.sessionsUrl).then(function(result) {
            console.log(result);

            $scope.search = function(text, room, day) {
                removeElementsByClass();
                $rootScope.$emit('change-divide-key', "");
                $scope.allSessions = [];
                var searchText = text.toLowerCase();
                $timeout(function() { $scope.searchBy(searchText, room, day) }, 10);
            };

            $scope.searchBy = function(text, room, day) {
                if (text === '' && room !== '' && day !== '') {
                    $scope.allSessions = result.filter(function(session) {
                        if (session.day[0] === day && session.locations[0] === room) {
                            return true;
                        }
                        return false;
                    });
                }
                if (text === '' && room === '' && day !== '') {
                    $scope.allSessions = result.filter(function(session) {
                        if (session.day[0] === day) {
                            return true;
                        }
                        return false;
                    });
                }
                if (text === '' && room !== '' && day === '') {
                    $scope.allSessions = result.filter(function(session) {
                        if (session.locations[0] === room) {
                            return true;
                        }
                        return false;
                    });
                }
                if (text !== '' && room !== '' && day !== '') {
                    $scope.allSessions = result.filter(function(session) {
                        if (session.day[0] === day && session.locations[0] === room && session.title.rendered.toLowerCase().search(text) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
                if (text !== '' && room === '' && day !== '') {
                    $scope.allSessions = result.filter(function(session) {
                        if (session.day[0] === day && session.title.rendered.toLowerCase().search(text) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
                if (text !== '' && room !== '' && day === '') {
                    $scope.allSessions = result.filter(function(session) {
                        if (session.locations[0] === room && session.title.rendered.toLowerCase().search(text) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
                if (text !== '' && room === '' && day === '') {
                    $scope.allSessions = result.filter(function(session) {
                        if (session.title.rendered.toLowerCase().search(text) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
            };
            // Functions "searchData" and "changeSection" filtered data by Day selected from days slider.
            $scope.searchData = function(fun) {
                removeElementsByClass();
                $rootScope.$emit('change-divide-key', "");
                $scope.allSessions = result.filter(function(session) {
                    if (session.day[0] === $scope.data.day) {
                        return true;
                    }
                    return false;
                });
            };
            // Logic about days slider.
            $scope.activeSection = 1;
            $scope.changeSection = function(sectionNumber, dayId) {
                if (dayId !== $scope.data.day) {
                    $scope.activeSection = sectionNumber;
                    $scope.data.day = dayId;
                    $scope.searchData();
                }
            };

            // call once when the app is ready.
            $scope.searchData();

            // Reset search form.
            $scope.resetSearch = function() {
                $scope.data.room = '';
                $scope.data.day = '';
                $scope.data.searchWord = '';
                removeElementsByClass();
                $rootScope.$emit('change-divide-key', "");
                $scope.allSessions = [];
            };
        });
    }

])

.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', 'AuthService', '$rootScope', 'UserInfoService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicLoading, AuthService, $rootScope, UserInfoService) {
        // hide or show menu items
        $scope.isLogged = false;
        $rootScope.$on('change-user-status', function(event, args) {
            console.log('Start Event->');
            console.log(args);

            $scope.isLogged = args;
        });

        $scope.logOutUser = function() {
            console.log('Log out! and go to login page');
            AuthService.logOut();
            $state.go('menu.wpLogin');
        };

    }
])

.controller('sponsorsCtrl', ['$scope', '$rootScope', '$stateParams', '$timeout', 'PostTypeService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $timeout, PostTypeService, ApiUrl) {
        console.log('-----------Sponsors list---------');
        //  We have to get this fields: ( field: path )
        //  name: title.rendered
        // 	sponsorDescription: content.rendered
        // 	website: acf.website
        // 	address: acf.address
        // 	logo: better_featured_image.source_url
        // 	sponsorId: .id
        $scope.dividerFunction = function(key) {
            return key;
        };
        // Remove auto dividers when we select another category.
        function removeElementsByClass(className) {
            $(".sponsors-list .divider-element-alph").remove();
        }

        // Show/hide days slider:
        $scope.daysLevelButtons = true;
        // Show hide search menu.
        $scope.showSearchMenu = false;
        $scope.showSearch = function() {
            if ($scope.showSearchMenu === false) {
                $scope.showSearchMenu = true;
                // hide levels buttons:
                $scope.daysLevelButtons = false;
                $scope.data.sponsorCategory = '';
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allSponsors = [];
            } else {
                $scope.showSearchMenu = false;
                // Show levels buttons:
                $scope.daysLevelButtons = true;
                $scope.data.sponsorCategory = $scope.levels[0].id;
                $scope.activeSection = 1;
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alhp', "");
                $scope.allSponsors = [];
                $scope.searchData();
            }
        };

        // Sponsors levels.
        $scope.levels = [
            { 'id': 'Silver', 'label': 'Silver' },
            { 'id': 'Gold', 'label': 'Gold' },
            { 'id': 'Platinum', 'label': 'Platinum' }
        ];
        $scope.data = {
            searchWord: '',
            sponsorCategory: $scope.levels[0].id,
        };
        // Get all sponsors.
        PostTypeService.getPosts(ApiUrl.sponsorsUrl).then(function(result) {
            console.log(result);

            $scope.search = function(text, level) {
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allSponsors = [];
                var searchText = text.toLowerCase();
                $timeout(function() { $scope.searchByTextField(searchText, level) }, 10);
            };

            $scope.searchByTextField = function(text, level) {
                if (text === '' && level !== '') {
                    $scope.allSponsors = result.filter(function(sponsor) {
                        if (sponsor.acf.level[0].value === level) {
                            return true;
                        }
                        return false;
                    });
                }
                if (text !== '' && level === '') {
                    $scope.allSponsors = result.filter(function(sponsor) {
                        if (sponsor.title.rendered.toLowerCase().search(text) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
                if (text !== '' && level !== '') {
                    $scope.allSponsors = result.filter(function(sponsor) {
                        if (sponsor.acf.level[0].value === level && sponsor.title.rendered.toLowerCase().search(text) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
            };

            // Functions "searchData" and "changeSection" filtered data by level selected from levels buttons.
            $scope.searchData = function(fun) {
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allSponsors = result.filter(function(sponsor) {
                    if (sponsor.acf.level[0].value === $scope.data.sponsorCategory) {
                        return true;
                    }
                    return false;
                });
            };
            // Logic about level buttons.
            $scope.activeSection = 1;
            $scope.changeSection = function(sectionNumber, category) {
                if ($scope.activeSection !== sectionNumber) {
                    $scope.activeSection = sectionNumber;
                    $scope.data.sponsorCategory = category;
                    removeElementsByClass();
                    $scope.searchData();
                }
            };
            // call once when the app is ready.
            $scope.searchData();

            // Reset search form.
            $scope.resetSearch = function() {
                $scope.data.sponsorCategory = '';
                $scope.data.searchWord = '';
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allSponsors = [];
            };
        });
    }
])

.controller('exhibitorsCtrl', ['$scope', '$rootScope', '$stateParams', '$timeout', 'PostTypeService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $timeout, PostTypeService, ApiUrl) {
        //  We have to get this fields: ( field: path )
        //  name: title.rendered
        // 	exhibitorDescription: content.rendered
        // 	website: acf.website
        // 	address: acf.address
        // 	logo: better_featured_image.source_url
        // 	sponsorId: .id
        console.log('-----------Exhibitors list---------');

        $scope.dividerFunction = function(key) {
            return key;
        };
        // Remove auto dividers when we select another category.
        function removeElementsByClass(className) {
            $(".exhibitors-list .divider-element-alph").remove();
            //   var elements = document.getElementsByClassName("divider-element-alph");
            //   while(elements.length > 0){
            //       elements[0].parentNode.removeChild(elements[0]);
            //   }
        }

        // Show hide search menu.
        $scope.showSearchMenu = false;
        $scope.showSearch = function() {
            if ($scope.showSearchMenu === false) {
                $scope.showSearchMenu = true;
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allExhibitors = [];
            } else {
                $scope.showSearchMenu = false;
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alhp', "");
                $scope.allExhibitors = $scope.currentExhibitors;
            }
        };

        $scope.data = {
            searchWord: ''
        };
        // Get all Exhibitors from DB.
        PostTypeService.getPosts(ApiUrl.exhibitorsUrl).then(function(result) {
            console.log(result);
            $scope.currentExhibitors = result;
            // Assign all exhibitors from db.
            $scope.allExhibitors = result;

            $scope.search = function(text) {
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allExhibitors = [];
                var searchText = text.toLowerCase();
                $timeout(function() { $scope.searchByTextField(searchText) }, 10);
            };

            $scope.searchByTextField = function(text) {
                if (text !== '') {
                    $scope.allExhibitors = result.filter(function(exhibitor) {
                        if (exhibitor.title.rendered.toLowerCase().search(text) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
            };

            // Reset search form.
            $scope.resetSearch = function() {
                $scope.data.searchWord = '';
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allExhibitors = [];
            };
        });
    }
])

.controller('committeeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('contactCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('infoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('floorplanCtrl', ['$scope', '$stateParams', '$log', 'leafletData', 'leafletBoundsHelpers', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $log, leafletData, leafletBoundsHelpers) {
        // MHLZ8O7XT16oHGayeojt_FLOORPLAN.png

        //var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        //var marker = L.marker([51.5, -0.09]).addTo(mymap);

        var maxBounds = leafletBoundsHelpers.createBoundsFromArray([
            [-540, -960],
            [540, 960]
        ]);

        var mainMarker = {
            lat: 51,
            lng: 51,
            focus: true,
            message: "Hey, drag me if you want",
            draggable: true
        };

        angular.extend($scope, {
            defaults: {
                scrollWheelZoom: true,
                crs: 'Simple',
                maxZoom: 4
            },
            center: {
                lat: 0,
                lng: 0,
                zoom: 0
            },
            maxBounds: maxBounds,
            layers: {
                baselayers: {
                    sanfrancisco: {
                        name: 'underground2',
                        type: 'imageOverlay',
                        url: '../img/MHLZ8O7XT16oHGayeojt_FLOORPLAN.png',
                        bounds: [
                            [-300, -300],
                            [300, 300]
                        ],
                        layerParams: {
                            showOnSelector: false,
                            noWrap: true,
                            attribution: 'Creative Commons image found <a href="../img/MHLZ8O7XT16oHGayeojt_FLOORPLAN.png">here</a>'
                        }
                    }
                },
            },
            markers: {
                mainMarker: {
                    lat: -5,
                    lng: -100,
                    focus: false,
                    message: "Hey, drag me if you want"
                },
                mainMarker1: {
                    lat: -30,
                    lng: 100,
                    focus: false,
                    message: "Hey, drag me if you want"
                }
            },
            events: {}
        });
    }
])

.controller('notificationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('searchCtrl', ['$scope', '$stateParams', 'AllDataService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, AllDataService) {
        $scope.types = [
            { 'id': 'speakers', 'label': 'Speakers' },
            { 'id': 'sponsors', 'label': 'Sponsors' },
            { 'id': 'sessions', 'label': 'Sessions' },
            { 'id': 'exhibitors', 'label': 'Exhibitors' }
        ];
        $scope.categories = [
            { 'id': 'Silver', 'label': 'Silver' },
            { 'id': 'Gold', 'label': 'Gold' },
            { 'id': 'Platinum', 'label': 'Platinum' }
        ];
        $scope.days = [
            { 'id': 4, 'label': 'Arrival Day' },
            { 'id': 5, 'label': 'Day 1' },
            { 'id': 6, 'label': 'Day 2' },
            { 'id': 7, 'label': 'Day 3' },
            { 'id': 8, 'label': 'Final Day' }
        ];
        // Should comes from API
        $scope.rooms = [
            { 'id': 9, 'label': 'Room A' },
            { 'id': 10, 'label': 'Room B' },
            { 'id': 11, 'label': 'Room C' },
            { 'id': 12, 'label': 'Room D' },
            { 'id': 13, 'label': 'Room E' }
        ];


        $scope.showSearchMenu = true;
        $scope.showSearch = function() {
            if ($scope.showSearchMenu === false) {
                $scope.showSearchMenu = true;
            } else {
                $scope.showSearchMenu = false;
            }
        };



        $scope.allData = {
            speakers: [],
            sponsors: [],
            sessions: [],
            exhibitors: []
        };

        $scope.search = {
            type: '',
            category: '',
            day: '',
            text: ''
        };

        console.log('All data---------------------------------------------------');
        // AllDataService.speakers().then(function(result){
        //     $scope.allData.speakers = result;
        //     console.log($scope.allData.speakers);
        //     console.log('****');
        //     AllDataService.sponsors().then(function(result){
        //         $scope.allData.sponsors = result;
        //         console.log($scope.allData.sponsors);
        //         console.log('****');
        //         AllDataService.sessions().then(function(result){
        //             $scope.allData.sessions = result;
        //             console.log($scope.allData.sessions);
        //             console.log('****');
        //             AllDataService.exhibitors().then(function(result){
        //                 $scope.allData.exhibitors = result;
        //                 console.log($scope.allData.exhibitors);
        //                 console.log('****');
        //                 console.log($scope.allData);


        //                 //Search logic:
        //                 $scope.searchInfo = function () {
        //                     // var speakersLenght = allData.speakers.lenght;
        //                     // var sponsorsLenght = allData.sponsors.lenght;
        //                     // var sessionsLenght = allData.sessions.lenght;
        //                     // var exhibitorsLenght = allData.exhibitors.lenght;

        //                     var postType = $scope.search.type;
        //                     var postCategory = $scope.search.category;
        //                     var postTExt = $scope.search.text;
        //                     var postDay = $scope.search.day;

        //                     if (postType === '') {
        //                         // Search in all types





        //                     } else {
        //                         if (postType === 'speakers') {
        //                             $scope.allData.speakers = $scope.allData.speakers.filter(function(speaker){
        //                                 // IMPORTANT
        //                                 // must use only one category field for all post types 
        //                                 if (speaker.acf.level[0].value === postCategory) {

        //                                     if (postTExt === '') {
        //                                         return true;
        //                                     } else {
        //                                         if (speaker.title.rendered.toLowerCase().indexOf(postTExt) > -1 || speaker.acf.company.toLowerCase().indexOf(postTExt) > -1 || speaker.acf.position.toLowerCase().indexOf(postTExt) > -1) {
        //                                             return true;
        //                                         } else {
        //                                           return false
        //                                         }
        //                                     }
        //                                 }
        //                                 return false;
        //                             });
        //                         }
        //                         if (postType === 'sponsors') {
        //                             $scope.allData.sponsors = $scope.allData.sponsors.filter(function(sponsor){
        //                                 // IMPORTANT
        //                                 // must use only one category field for all post types 
        //                                 if (sponsor.acf.level[0].value === postCategory) {

        //                                     if (postTExt === '') {
        //                                         return true;
        //                                     } else {
        //                                         if (sponsor.title.rendered.toLowerCase().indexOf(postTExt) > -1) {
        //                                             return true;
        //                                         } else {
        //                                           return false
        //                                         }
        //                                     }
        //                                 }
        //                                 return false;
        //                             });
        //                         }
        //                         if (postType === 'sessions') {
        //                             $scope.allData.sessions = $scope.allData.sessions.filter(function(session){
        //                                 // IMPORTANT
        //                                 // must use only one category field for all post types 
        //                                 if (session.day[0] === postDay && session.location[0] === postCategory) {

        //                                     if (postTExt === '') {
        //                                         return true;
        //                                     } else {
        //                                         if (session.title.rendered.toLowerCase().indexOf(postTExt) > -1) {
        //                                             return true;
        //                                         } else {
        //                                           return false
        //                                         }
        //                                     }
        //                                 }
        //                                 return false;
        //                             });
        //                         }
        //                         if (postType === 'exhibitors') {
        //                             $scope.allData.exhibitors = $scope.allData.exhibitors.filter(function(exhibitor){
        //                                 // IMPORTANT
        //                                 // must use only one category field for all post types 
        //                                 if (exhibitor.acf.level[0].value === postCategory) {

        //                                     if (postTExt === '') {
        //                                         return true;
        //                                     } else {
        //                                         if (exhibitor.title.rendered.toLowerCase().indexOf(postTExt) > -1) {
        //                                             return true;
        //                                         } else {
        //                                           return false
        //                                         }
        //                                     }
        //                                 }
        //                                 return false;
        //                             });
        //                         }
        //                     }
        //                     //return data
        //                 };
        //             });
        //         });
        //     });
        // });
        console.log('All data---------------------------------------------------');

        //console.log('All data---------------------------------------------------');
        // AllDataService.speakers().then(function(result){
        //     allData.speakers = result;
        //     console.log(allData.speakers);

        // });
        // AllDataService.sponsors().then(function(result){
        //     allData.sponsors = result;
        //     console.log(allData.sponsors);
        // });
        // AllDataService.sessions().then(function(result){
        //     allData.sessions = result;
        //     console.log(allData.sessions);
        // });
        // AllDataService.exhibitors().then(function(result){
        //     allData.exhibitors = result;
        //     console.log(allData.exhibitors);
        // });
        // console.log('All data---------------------------------------------------');

    }
])

.controller('speakersCtrl', ['$scope', '$rootScope', '$stateParams', '$timeout', 'PostTypeService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $timeout, PostTypeService, ApiUrl) {
        //var speakersApiUrl = "https://13367.de/wp-json/wp/v2/speakers?per_page=100";
        // ****************************************************** //
        //  We habe to get this fields: ( field: path )
        //  name: title.rendered
        // 	company: acf.company
        // 	position: acf.position
        // 	image: acf.photo.url
        // 	or
        // 	image: better_featured_image.source_url
        // 	biography: content.rendered
        // 	speakerId: .id
        // ****************************************************** //
        console.log('-----------Speaker list---------');
        $scope.dividerFunction = function(key) {
            return key;
        };
        // Remove auto dividers when we select another category.
        function removeElementsByClass(className) {
            $(".speakers-list .divider-element-alph").remove();
        }

        // Show hide search menu.
        $scope.showSearchMenu = false;
        $scope.showSearch = function() {
            if ($scope.showSearchMenu === false) {
                $scope.showSearchMenu = true;
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allSpeakers = [];
            } else {
                $scope.showSearchMenu = false;
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alhp', "");
                $scope.allSpeakers = $scope.currentSpeakers;
            }
        };

        $scope.data = {
            searchWord: ''
        };

        // Get all speakers from WP DB.
        PostTypeService.getPosts(ApiUrl.speakersUrl).then(function(result) {
            console.log(result);
            $scope.currentSpeakers = result;
            // Assign all exhibitors from db.
            $scope.allSpeakers = result;

            $scope.search = function(text) {
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allSpeakers = [];
                var searchText = text.toLowerCase();
                $timeout(function() { $scope.searchByTextField(searchText) }, 10);
            };

            $scope.searchByTextField = function(text) {
                if (text !== '') {
                    $scope.allSpeakers = result.filter(function(speaker) {
                        if (speaker.title.rendered.toLowerCase().search(text) > -1) {
                            return true;
                        }
                        return false;
                    });
                }
            };

            // Reset search form.
            $scope.resetSearch = function() {
                $scope.data.searchWord = '';
                removeElementsByClass();
                $rootScope.$emit('change-divide-key-alph', "");
                $scope.allSpeakers = [];
            };
        });
    }
])

.controller('speakerCtrl', ['$scope', '$stateParams', 'PostTypeService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, PostTypeService, ApiUrl) {
        //var speakersApiUrl = "https://13367.de/wp-json/wp/v2/speakers/";
        //  We habe to get this fields: ( field: path )
        //  name: title.rendered
        // 	company: acf.company
        // 	position: acf.position
        // 	image: acf.photo.url
        // 	or
        // 	image: better_featured_image.source_url
        // 	biography: content.rendered
        // 	speakerId: .id
        // Current speaker ID.
        $scope.currentSpeakerId = $stateParams.id;

        // Get details for current user.
        PostTypeService.getPost(ApiUrl.speakerUrl, $scope.currentSpeakerId).then(function(result) {
            console.log('Single speaker');
            console.log(result);
            $scope.singleSpeakerInfo = {
                name: result.title.rendered,
                image: result.acf.photo.url,
                company: result.acf.company,
                position: result.acf.position,
                bio: result.content.rendered,
                sessions: result.acf.session_connection
            };
        });
    }
])

.controller('sponsorCtrl', ['$scope', '$stateParams', 'PostTypeService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, PostTypeService, ApiUrl) {
        //  We habe to get this fields: ( field: path )
        //  name: title.rendered
        // 	sponsorDescription: content.rendered
        // 	website: acf.website
        // 	address: acf.address
        // 	logo: better_featured_image.source_url
        // 	sponsorId: .id

        // Current sponsor ID.
        $scope.currentSponsorId = $stateParams.id;
        // Details for current post.
        PostTypeService.getPost(ApiUrl.sponsorUrl, $scope.currentSponsorId).then(function(result) {
            console.log('Single sponsor');
            console.log(result);
            $scope.singleSponsor = {
                name: result.title.rendered,
                sponsorDescription: result.content.rendered,
                website: result.acf.website,
                address: result.acf.address,
                logo: result.better_featured_image.source_url,
                level: result.acf.level[0].value
            };
        });
    }
])

.controller('sessionCtrl', ['$scope', '$stateParams', 'PostTypeService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, PostTypeService, ApiUrl) {
        //var sessionApiUrl = "https://13367.de/wp-json/wp/v2/schedule/";
        //  We habe to get this fields: ( field: path )
        //  name: title.rendered
        // 	sessionDescription: content.rendered
        // 	startTime: acf.start_time
        // 	endTime: acf.end_time
        // 	speakers: acf.speaker_connection
        // 	sessionId: id
        // 	location: locations
        // 	day: day
        // Current sessions ID.
        $scope.currentSessionId = $stateParams.id;
        $scope.singleSessionInfo = {};

        // Details for current user.
        PostTypeService.getPost(ApiUrl.sessionUrl, $scope.currentSessionId).then(function(result) {
            console.log('Single session');
            console.log(result);
            $scope.singleSession = {
                name: result.title.rendered,
                sessionDescription: result.content.rendered,
                startTime: result.acf.start_time,
                endTime: result.acf.end_time,
                location: result.locations[0],
                day: result.day,
                speakers: result.acf.speaker_connection,
                slots: result.acf.slots
            };
        });
    }
])

.controller('exhibitorCtrl', ['$scope', '$stateParams', 'PostTypeService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, PostTypeService, ApiUrl) {
        //  We habe to get this fields: ( field: path )
        //  name: title.rendered
        // 	exhibitorDescription: content.rendered
        // 	website: acf.website
        // 	address: acf.address
        // 	logo: better_featured_image.source_url
        // 	exhibitorId: .id

        // Current exhibitor ID.
        $scope.currentExhibitorId = $stateParams.id;

        // Details for current post.
        PostTypeService.getPost(ApiUrl.exhibitorUrl, $scope.currentExhibitorId).then(function(result) {
            console.log('Single exhibitor');
            console.log(result);
            $scope.singleExhibitor = {
                name: result.title.rendered,
                exhibitorDescription: result.content.rendered,
                website: result.acf.website,
                address: result.acf.address,
                logo: result.better_featured_image.source_url
            };
        });
    }
])

.controller('welcomeMessageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

        $scope.messageOne = false;
        $scope.messageTwo = false;
        $scope.sessionTopics = false;

        $scope.showText = function(number) {
            if (number === 1) {
                if ($scope.messageOne === false) {
                    $scope.messageOne = true;
                } else {
                    $scope.messageOne = false;
                }
            }
            if (number === 2) {
                if ($scope.messageTwo === false) {
                    $scope.messageTwo = true;
                } else {
                    $scope.messageTwo = false;
                }
            }
            if (number === 3) {
                if ($scope.sessionTopics === false) {
                    $scope.sessionTopics = true;
                } else {
                    $scope.sessionTopics = false;
                }
            }
        };

    }
])

.controller('myAccountCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
])

.controller('newsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('surveyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('socialNetworksCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('videosCtrl', ['$scope', '$stateParams', 'Tutorials', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, Tutorials) {
        // Show / hide search menu.
        $scope.showSearchMenu = false;
        $scope.showSearch = function() {
            if ($scope.showSearchMenu === false) {
                $scope.showSearchMenu = true;
            } else {
                $scope.showSearchMenu = false;
            }
        };
        $scope.data = {
            search: ''
        };
        // Get all videos from file/Db.
        $scope.narrowed_tutorials = Tutorials.list;
        // Search by text field.
        $scope.search = function() {
            var searchWord = $scope.data.search.toLowerCase();
            if (searchWord === '') {
                $scope.narrowed_tutorials = Tutorials.list;
                return;
            }
            $scope.narrowed_tutorials = Tutorials.list.filter(function(tutorial) {
                if (tutorial.name.toLowerCase().indexOf(searchWord) > -1 || tutorial.description.toLowerCase().indexOf(searchWord) > -1) {
                    return true;
                }
                return false;
            });
        };

    }
])

.controller('bookmarksCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('myNotesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('galleryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('videoCtrl', ['$scope', '$stateParams', 'Tutorials', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, Tutorials) {
        // Get current video.
        $scope.video = Tutorials.keys[$stateParams.videokey];

    }
])

.controller('abstractCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('googleMapCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('wpLoginCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', 'AuthService', '$rootScope', 'UserInfoService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicLoading, AuthService, $rootScope, UserInfoService) {
        $scope.user = {};
        $scope.thereIsntUser = false;
        $scope.thereIsUser = false;

        $scope.doLogin = function() {
            $ionicLoading.show({
                template: 'Logging in...'
            });
            var user = {
                userName: $scope.user.userName,
                password: $scope.user.password
            };

            AuthService.doLogin(user)
                .then(function(user) {
                    //success
                    console.log('login-> success');
                    $scope.thereIsntUser = false;
                    $scope.thereIsUser = true;
                    $scope.success = 'Hi ' + user.data.username + ', welcome to our system!';
                    $state.go('menu.wTC2017');
                    $ionicLoading.hide();
                }, function(err) {
                    console.log('login-> error');
                    console.log(err);
                    //err
                    $scope.thereIsntUser = true;
                    $scope.error = err;
                    $ionicLoading.hide();
                });
        };
    }
])

.controller('forgotPasswordCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', 'AuthService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicLoading, AuthService) {

        $scope.user = {};

        $scope.recoverPassword = function() {

            $ionicLoading.show({
                template: 'Recovering password...'
            });

            AuthService.doForgotPassword($scope.user.userName)
                .then(function(data) {
                    console.log(data);
                    if (data.status == "error") {
                        $scope.error = data.error;
                    } else {
                        $scope.message = "Link for password reset has been emailed to you. Please check your email.";
                    }
                    $ionicLoading.hide();
                });
        };
    }
])

.controller('registrationCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', 'AuthService', '$rootScope', 'UserInfoService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicLoading, AuthService, $rootScope, UserInfoService) {
        $scope.user = {};

        $scope.doRegister = function() {

            $ionicLoading.show({
                template: 'Registering user...'
            });

            var user = {
                userName: $scope.user.userName,
                password: $scope.user.password,
                email: $scope.user.email,
                displayName: $scope.user.displayName
            };

            AuthService.doRegister(user)
                .then(function(user) {
                    //success
                    console.log('Register one user!');
                    console.log(user);
                    $state.go('menu.wTC2017');
                    $ionicLoading.hide();
                }, function(err) {
                    //err
                    console.log('Register failed!');
                    $scope.error = err;
                    $ionicLoading.hide();
                });
        };
    }
])

.controller('formidableFormCtrl', ['$scope', '$stateParams', '$http', '$q', '$location', '$state', 'FormidableService', 'ApiUrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $q, $location, $state, FormidableService, ApiUrl) {
        console.log('---- Formidable Form ----');
        //Authorization process.
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode('mihail' + ':' + 'mihail.succevo');
        //console.log($http.defaults.headers.common['Authorization']);

        FormidableService.getForm(ApiUrl.formidableFormHtml).then(function(result) {
            console.log('---Get HTML--');
            console.log(result);

            // var curFormHtml = result.renderedHtml;
            // console.log(curFormHtml);
            // curFormHtml.replace("action=\"https:\/\/13367.de\/wp-admin\/admin-ajax.php?action=frm_forms_preview&#038;form=d32tt", "asd");
            // $scope.formHtml = curFormHtml;

            $scope.formHtml = result.renderedHtml;
            console.log($scope.formHtml);
            // Append formidable Form on form App page.

            document.getElementById("demo").innerHTML = $scope.formHtml;
            if (typeof(Storage) !== "undefined") {
                alert('OK');
            } else {
                alert('Problem');
            }
            // $(".frm-show-form").removeAttr("action");
            // $(".frm-show-form").removeAttr("method");
            // $("#field_yhwz2").attr("ng-model","asd");
            // $( ".frm_button_submit" ).click(function() {

            //     $state.go('menu.wTC2017');
            // });

        });
    }
])