

 var myApp = angular.module("app", ['ionic','ngResource','templates'])
    .constant("$ionicLoadingConfig", {
        template: '<div class="ion-load-c loading-icon" style="z-index:999;"></div>加载中...'
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $stateProvider
            .state('start',{
               url:"/start" ,
            })
            .state('tab', {
               url:"/tab" ,
               abstract: true,
               templateUrl: 'tabs.html',
            })
            .state('tab.topics', {
               url:"/topics" ,
               views: {
                    'tab-topics': {
                       templateUrl: 'tab-topics.html',
                       controller:"TopicsCtrl"
                    }
                }
            });
            // .state('tab.activity', {
            //     url: '/activity',
            //     views: {
            //         'tab-activity': {
            //             templateUrl: 'templates/tab-activity.html',
            //             controller: 'ActivityCtrl'
            //         }
            //     }
            // })
            // .state('tab.chats', {
            //     url: '/chats',
            //     views: {
            //         'tab-chats': {
            //             templateUrl: 'templates/tab-chats.html',
            //             controller: 'ChatsCtrl'
            //         }
            //     }
            // });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("/tab/topics");

    });
    

