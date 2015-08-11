angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $log, $timeout,
    $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
    $location, $state,
    /*$cordovaNetwork,*/ /*$cordovaGoogleAnalytics,*/
    Topics, Tabs, My, User, ENV) {
    console.log("enter topics ctrl");

    // get current user
    var currentUser = User.getCurrentUser();
    $scope.loginName = currentUser.loginname || null;

    $scope.$on('$ionicView.beforeEnter', function() {
        // get user settings
        $scope.settings = My.getSettings();
        $rootScope.hideTabs = '';
    });


    $scope.$on('$ionicView.afterEnter', function() {

        document.addEventListener("deviceready", function() {
            // trackView
           // $cordovaGoogleAnalytics.trackView('topics view');
        }, false);


        $timeout(function() {
            $scope.topics = Topics.getTopics();
        }, 100);
    });




    // $scope.title = "全部话题";
    // assign tabs
    $scope.tabs = Tabs;
    $scope.currentTab = Topics.getCurrentTab();




    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('views/topic/popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        // console.log('show popover');
        $scope.popover.show($event);
    };

    $scope.changeTab = function(tab) {
        Topics.setCurrentTab(tab);
        $scope.currentTab = Topics.getCurrentTab();
        $scope.popover.hide();
    };


    // $topicCategory = $ionicTabsDelegate.$getByHandle('topic-category');
    // var category = TabCategory.get($topicCategory.selectedIndex());
    // var category = "all";
    Topics.fetchTopStories();





    $scope.$on('ioniclub.topicsUpdated', function() {
        // $timeout(function() {
        $scope.topics = Topics.getTopics();
        $scope.$broadcast('scroll.refreshComplete');
        // }, 100);
    });

    // logout
    $rootScope.$on('ioniclub.logout', function() {
        $log.debug('logout broadcast handle');
        $scope.loginName = null;
        $scope.messagesCount = 0;
        // setBadge(0);
    });






    // $scope.onTabSelected = function() {
    //   // category = TabCategory.get($topicCategory.selectedIndex());
    //   Topics.setCurrentTab(category);
    //   Topics.fetchTopStories();
    //   $scope.topics = Topics.getTopics();
    //   // console.log(category);
    // };

    $scope.doRefresh = function() {
        Topics.fetchTopStories();
    };


    $scope.loadMore = function() {
        // console.log("loadMore");
        Topics.increaseNewTopicsCount(15);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.moreDataCanBeLoaded = function() {
        // console.log(Topics.hasNextPage());
        return Topics.hasNextPage();
    };

    // Create the new topic modal that we will use later
    $ionicModal.fromTemplateUrl('views/topic/newTopic.html', {
        tabs: Tabs,
        scope: $scope
    }).then(function(modal) {
        $scope.newTopicModal = modal;
    });

    $scope.newTopicData = {
        tab: 'share',
        title: '',
        content: ''
    };
    $scope.newTopicId = null;

    // save new topic
    $scope.saveNewTopic = function() {
        $log.debug('new topic data:', $scope.newTopicData);
        $ionicLoading.show();
        Topics.saveNewTopic($scope.newTopicData).$promise.then(function(response) {
            $ionicLoading.hide();
            $scope.newTopicId = response.topic_id;
            $scope.closeNewTopicModal();
            $timeout(function() {
                $state.go('tab.topic-detail', {
                    id: $scope.newTopicId
                });
                $timeout(function() {
                    $scope.doRefresh();
                }, 300);
            }, 300);
        }, $rootScope.requestErrorHandler);
    };
    $scope.$on('modal.hidden', function() {
        // Execute action
        if ($scope.newTopicId) {
            $timeout(function() {
                $location.path('#/tab/topics/' + $scope.newTopicId);
            }, 300);
        }
    });
    // show new topic modal
    $scope.showNewTopicModal = function() {

        // track view
        if (window.analytics) {
            window.analytics.trackView('new topic view');
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        $scope.newTopicModal.show();
    };

    // close new topic modal
    $scope.closeNewTopicModal = function() {
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }
        $scope.newTopicModal.hide();
    };


})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();

    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('GiftCtrl', function($scope, Gift) {
        var _allGift = Gift.all();
        $scope.gifts = [];
        var _g = [];
        for (var i in _allGift) {
            _g.push(_allGift[i]);
            if ((i + 1) % 3 == 0) {
                $scope.gifts.push(_g);
                _g = [];
            }

        }
    })
    .controller('GiftDetailCtrl', function($scope, $stateParams, Gift) {
        $scope.gift = Gift.get($stateParams.giftId);
    })
    .controller('AccountCtrl', function($scope) {
        // Triggered on a button click, or some other target

    })
    .controller('BasicInfoCtrl', function($scope, $ionicActionSheet) {
        $scope.showActionsheet = function() {

            $ionicActionSheet.show({
                titleText: '性别',
                buttons: [{
                    text: '<i class="icon ion-male balanced"></i> 男'
                }, {
                    text: '<i class="icon ion-female balanced"></i> 女'
                }, ],
                destructiveText: '',
                cancelText: "取消",
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {
                    console.log('BUTTON CLICKED', index);
                    if (index == 0) {
                        $scope.genter = "男";
                    } else {
                        $scope.genter = "女";
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                },
                cssClass: "wg-sheet"
            });
        };
    })


;
