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
                    if(index==0){
                        $scope.genter="男";
                    }else{
                        $scope.genter="女";
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                },
                cssClass:"wg-sheet"
            });
        };
    })


;
