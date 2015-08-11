// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'oc.lazyLoad', 'templates' ,'starter.config','starter.controllers', 'starter.services', 'ngResource'])

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
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.maxCache(0);

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('返回').icon('ion-ios-arrow-back');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('返回').icon('ion-ios-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.sh
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        views: {
            "": {
                //  controller: 'AppCtrl', // This view will use AppCtrl loaded below in the resolve
                templateUrl: 'tabs.html'
            }
        }
        

    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'tab-dash.html',
                controller: 'DashCtrl'
            }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            DashCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('js/controllers.js');
            }]
        }
    })

    .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })
        .state('tab.gift', {
            url: '/gift',
            views: {
                'tab-gift': {
                    templateUrl: 'tab-gift.html',
                    controller: 'GiftCtrl'
                }
            }
        })
        .state('tab.giftDetail', {
            url: '/gift/:giftId',
            views: {
                'tab-gift': {
                    templateUrl: 'gift-detail.html',
                    controller: 'GiftDetailCtrl'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.basicInfo', {
            url: '/basicInfo',
            views: {
                'tab-account': {
                    templateUrl: 'tab-basicInfo.html',
                    controller: 'BasicInfoCtrl'
                }
            }
        })
        .state('tab.userName', {
            url: '/userName',
            views: {
                'tab-account': {
                    templateUrl: 'userName.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.address', {
            url: '/address',
            views: {
                'tab-account': {
                    templateUrl: 'address.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.phone', {
            url: '/phone',
            views: {
                'tab-account': {
                    templateUrl: 'phone.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.email', {
            url: '/email',
            views: {
                'tab-account': {
                    templateUrl: 'email.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.expertise', {
            url: '/expertise',
            views: {
                'tab-account': {
                    templateUrl: 'expertise.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.serviceSillingness', {
            url: '/serviceSillingness',
            views: {
                'tab-account': {
                    templateUrl: 'serviceSillingness.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.feedback', {
            url: '/feedback',
            views: {
                'tab-account': {
                    templateUrl: 'feedback.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.gender', {
            url: '/gender',
            views: {
                'tab-account': {
                    templateUrl: 'gender.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.area', {
            url: '/area',
            views: {
                'tab-account': {
                    templateUrl: 'area.html',
                    // controller: 'AccountCtrl'
                }
            }
        })

    .state('tab.myGift', {
            url: '/myGift',
            views: {
                'tab-account': {
                    templateUrl: 'tab-myGift.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        
        .state('tab.help', {
            url: '/help',
            views: {
                'tab-account': {
                    templateUrl: 'tab-help.html',
                    // controller: 'AccountCtrl'
                }
            }
        })

    .state('tab.myTeam', {
        url: '/myTeam',
        views: {
            'tab-account': {
                templateUrl: 'tab-myTeam.html',
                // controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

     $stateProvider.state('tab.honorRanking', {
            url: '/honorRanking',
            abstract: true,
            views: {
                'tab-account': {
                    templateUrl: 'tab-honorRanking.html',
                    //controller: 'AccountCtrl'
                }
            }
        })
         .state('tab.honorRanking.local', {
            url: '/honorRanking/local',
            views: {
                'tab-account': {
                    templateUrl: 'tab-honorRanking.html',
                    //controller: 'AccountCtrl'
                }
            }
        })
          .state('tab.honorRanking.all', {
            url: '/honorRanking/all',
            views: {
                'tab-account': {
                    templateUrl: 'tab-honorRanking.html',
                    //controller: 'AccountCtrl'
                }
            }
        })
});
