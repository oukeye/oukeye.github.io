// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var v = "1.0.6" + new Date();
angular.module('starter', ['ionic', 'oc.lazyLoad', 'templates', 'starter.directives', 'starter.services'])
    .constant("$ionicLoadingConfig", {
        template: '<div class="ion-load-c loading-icon"></div>加载中...'
    })
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
                views: {
                    "": {
                        controller: 'AppCtrl', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: "menu.html",
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    AppCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('js/controllers/AppCtrl.js');
                    }]
                }

            })

        .state('app.search', {
            url: "/search",
            views: {
                'menuContent': {
                    templateUrl: "search.html"
                }
            }
        })

        .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "browse.html",
                        controller: 'BrowseCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('js/controllers/BrowseCtrl.js');
                    }]
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('js/controllers/PlaylistsCtrl.js');
                    }]
                }
            })

        .state('app.single', {
            url: "/playlists/:playlistId",
            views: {
                'menuContent': {
                    templateUrl: "playlists.html",
                    controller: 'PlaylistCtrl'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('js/controllers/PlaylistCtrl.js');
                }]
            }
        });

        $urlRouterProvider.otherwise('/app/index/home');
    })
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.index', {
                url: "/index",
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: "index.html",
                        controller: 'IndexCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('js/controllers/IndexCtrl.js');
                    }]
                }
            })

        .state('app.index.home', {
            url: "/home",

            views: {
                'home-tab': {
                    templateUrl: "home.html",
                    controller: 'HomeCtrl'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                HomeCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('js/controllers/HomeCtrl.js');
                }],
                products: ['productsService',
                    function(productsService) {
                        return productsService.all();
                    }
                ]
            }
        })

        .state('app.index.productlists', {
                url: "/productlists/:productId",
                views: {
                    'home-tab': {
                        templateUrl: "productlists.html",
                        controller: 'ProductlistsCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('js/controllers/ProductlistsCtrl.js');
                    }]
                }
            })
            .state('app.index.tabs.facts', {
                url: "/facts",
                views: {
                    'home-tab': {
                        templateUrl: "facts.html"
                    }
                }
            })
            .state('app.index.tabs.facts2', {
                url: "/facts2",
                views: {
                    'home-tab': {
                        templateUrl: "facts2.html"
                    }
                }
            })
            .state('app.index.positions', {
                url: "/positions",
                views: {
                    'positions-tab': {
                        templateUrl: "positions.html",
                        controller: 'PositionsCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('js/controllers/PositionsCtrl.js');
                    }],
                    products: ['productsService',
                        function(productsService) {
                            return productsService.all();
                        }
                    ]
                }
            })
            .state('app.index.tabs.navstack', {
                url: "/navstack",
                views: {
                    'about-tab': {
                        templateUrl: "nav-stack.html"

                    }
                }
            })
            .state('app.index.contact', {
                url: "/contact",
                views: {
                    'contact-tab': {
                        templateUrl: "refresher.html",
                        controller: 'RefresherCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadOcModal: ['$ocLazyLoad', '$injector', '$rootScope', function($ocLazyLoad, $injector, $rootScope) {
                        // Load 'oc.modal' defined in the config of the provider $ocLazyLoadProvider
                        console.log('load');
                        return $ocLazyLoad.load([
                            'css/ionic.app.css',
                            'js/services/person.js',
                            'js/templates.min.js',
                            'js/controllers/refresher.js'
                        ]).then(function() {
                            console.log('--------then');
                           /* $rootScope.bootstrapLoaded = true;
                            // inject the lazy loaded service
                            var $ocModal = $injector.get("$ocModal");
                            console.log($ocModal);
                            $ocModal.open({
                                url: 'modal',
                                cls: 'fade-in'
                            });*/
                        });
                    }]
                }

                // if none of the above states are matched, use this as the fallback
            });
    });
