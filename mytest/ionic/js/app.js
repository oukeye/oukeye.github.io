// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var v = "1.0.6" + new Date();
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services'])

.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            //  $templateCache.removeAll();
        });
    })
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(30);

        // note that you can also chain configs
        $ionicConfigProvider.backButton.text('返回').icon('ion-chevron-left');
        // $ionicConfigProvider.views.transition('ios');
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html?v=" + v,
            controller: 'AppCtrl'
        })

        .state('app.search', {
            url: "/search",
            views: {
                'menuContent': {
                    templateUrl: "templates/search.html?v=" + v
                }
            }
        })

        .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html?v=" + v,
                        controller: 'BrowseCtrl'
                    }
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html?v=" + v,
                        controller: 'PlaylistsCtrl'
                    }
                }
            })
            /*.state('app.index', {
                url: "/index",
                views: {
                    'menuContent': {
                        templateUrl: "templates/index.html?v=" + v,
                        controller: 'IndexCtrl'
                    },
                    'tabs': {
                        templateUrl: "templates/home.html?v=" + v
                            //  controller: 'IndexCtrl'
                    }
                }
            })*/
            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html?v=" + v,
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('app.productlists', {
                url: "/productlists/:productId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/productlists.html?v=" + v,
                        controller: 'ProductlistsCtrl'
                    }
                }
            });


        $urlRouterProvider.otherwise('/app/index');
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.index', {
                url: "/index",
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: "templates/index.html?v=" + v,
                        controller: 'IndexCtrl'
                    }
                }
            })
           /* .state('app.index.tabs', {
                url: "",
                //abstract: true,
                views: {
                    'home-tab': {
                        templateUrl: "templates/tabs_test.html"
                    }
                }

            })*/
            .state('app.index.home', {
                url: "",
                views: {
                    'home-tab': {
                        templateUrl: "templates/home.html",
                        // controller: 'HomeTabCtrl'
                    }
                }
            })
            .state('app.index.tabs.facts', {
                url: "/facts",
                views: {
                    'home-tab': {
                        templateUrl: "templates/facts.html"
                    }
                }
            })
            .state('app.index.tabs.facts2', {
                url: "/facts2",
                views: {
                    'home-tab': {
                        templateUrl: "templates/facts2.html"
                    }
                }
            })
            .state('app.index.about', {
                url: "/about",
                views: {
                    'about-tab': {
                        templateUrl: "templates/about.html"
                    }
                }
            })
            .state('app.index.tabs.navstack', {
                url: "/navstack",
                views: {
                    'about-tab': {
                        templateUrl: "templates/nav-stack.html"
                    }
                }
            })
            .state('app.index.contact', {
                url: "/contact",
                views: {
                    'contact-tab': {
                        templateUrl: "templates/contact.html"
                    }
                }
            });
        // $urlRouterProvider.otherwise("/home");


        // if none of the above states are matched, use this as the fallback
    });
