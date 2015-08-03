angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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
        $scope.settings = {
            enableFriends: true
        };
    });
