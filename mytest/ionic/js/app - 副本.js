// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var v = "1.0.6" + new Date();
angular.module('starter', ['ionic', 'templates', 'starter.controllers', 'starter.directives', 'starter.services'])
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
    .config(function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            loadedModules: ['monitorApp'], //主模块名,和ng.bootstrap(document, ['monitorApp'])相同     
            jsLoader: requirejs, //使用requirejs去加载文件       
            files: ['modules/summary', 'modules/appEngine', 'modules/alarm', 'modules/database'], //主模块需要的资源，这里主要子模块的声明文件      
            debug: true
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
            templateUrl: "menu.html",
            controller: 'AppCtrl'
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
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

        .state('app.single', {
            url: "/playlists/:playlistId",
            views: {
                'menuContent': {
                    templateUrl: "playlists.html",
                    controller: 'PlaylistCtrl'
                }
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
                }

            })

        .state('app.index.home', {
            url: "/home",
            resolve: {
                /* price: ['priceService',
                     function(priceService) {

                         return priceService.all();
                     }
                 ],*/
                products: ['productsService',
                    function(productsService) {
                        return productsService.all();
                    }
                ]
            },
            views: {
                'home-tab': {
                    templateUrl: "home.html",
                    controller: 'HomeCtrl'
                }
            }
        })

        .state('app.index.productlists', {
                url: "/productlists/:productId",
                views: {
                    'home-tab': {
                        templateUrl: "productlists.html",
                        controller: 'ProductlistsCtrl'
                    }
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
            .state('app.index.about', {
                url: "/about",
                views: {
                    'about-tab': {
                        templateUrl: "about.html"
                    }
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
                        templateUrl: "contact.html"
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
    });
