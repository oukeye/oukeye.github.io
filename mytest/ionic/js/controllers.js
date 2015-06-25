'use strict';
var v = new Date();
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $ionicActionSheet) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Consume Ice Cream',
            template: 'Are you sure you want to eat this ice cream?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    };
    // Triggered on a button click, or some other target
    $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '<b>Share</b> This'
            }, {
                text: 'Move'
            }],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            cancel: function() {
                // hideSheet();
            },
            buttonClicked: function(index) {
                return true;
            },
            cssClass: 'testclass'
        });

        // For example's sake, hide the sheet after two seconds
        /*$timeout(function() {
            hideSheet();
        }, 2000);*/

    };
})

.controller('PlaylistsCtrl', function($scope) {
        $scope.playlists = [{
            title: 'Reggae',
            id: 1
        }, {
            title: 'Chill',
            id: 2
        }, {
            title: 'Dubstep',
            id: 3
        }, {
            title: 'Indie',
            id: 4
        }, {
            title: 'Rap',
            id: 5
        }, {
            title: 'Cowbell',
            id: 6
        }];
    })
    .controller('BrowseCtrl', function($scope, $ionicBackdrop, $timeout) {


    })
    .controller('IndexCtrl', function($scope, $stateParams, priceService) {
        $scope.orderCounts = 0; //默认没有订单

    })

.controller('PlaylistCtrl', function($scope, $stateParams) {

    })
    .controller('ProductlistsCtrl', function($scope, $stateParams, $ionicModal, productsService) {
        var productId = $stateParams.productId;
        var _p_array = [];
        console.log(typeof $scope.allProductlists);
        if (typeof $scope.allProductlists === 'undefined') {
            productsService.products()
                .success(function(data, status) {
                    var _o = data.object;
                    $scope.allProductlists = data.object;
                    for (var i = 0; i < $scope.allProductlists.length; i++) {
                        if ($scope.allProductlists[i]['contact_code'] == productId) {
                            _p_array.push($scope.allProductlists[i]);

                        }
                    }
                    $scope.productlist = _p_array;
                });


        } else {
            for (var i = 0; i < $scope.allProductlists.length; i++) {
                if ($scope.allProductlists[i]['contact_code'] == productId) {
                    _p_array.push($scope.productlist[i]);

                }
            }
            $scope.productlist = _p_array;
        }

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('buy_order.html', {
            scope: $scope
        }).then(function(buymodal) {
            $scope.buymodal = buymodal;
        });


        // Open the login modal
        $scope.buy = function() {
            $scope.buymodal.show();
        };
        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.buymodal.hide();
        };

    })

.controller('HomeCtrl', function($scope, $stateParams, $ionicModal, $timeout, $interval, $ionicLoading, buyOrderService, priceService, products, utils) {

        var vm = this;

        $scope.$on('priceService.update', function(event) {

            priceService.all().then(function(data) {
                var _data = utils.newRandomPrice(data); //模拟价格数据
                $scope.priceList = _data;
            });

            //  $scope.$apply(); //注意，原文这里少了这一行
        });

        $scope.getPriceByContract = function(contract) {
            var datalist = $scope.priceList;
            if (angular.isArray(datalist)) {
                for (var i = 0; i < datalist.length; i++) {
                    if (datalist[i].contact_code == contract) {
                        return datalist[i];
                    }
                }
            }

        }

        $scope.allProductlists = products;
        $ionicModal.fromTemplateUrl('buy_order.html', {
            scope: $scope
        }).then(function(buymodal) {
            $scope.buymodal = buymodal;
        });


        $scope.buyCount = 1;
        $scope.buy = function(id) {
            $scope.buyCount = 1;
            $scope.buyProduct = utils.findById($scope.allProductlists, id);
            $scope.buymodal.show();
        };

        $scope.closeBuyorder = function() {
            $scope.buymodal.hide();
        };
        $scope.doBuyorder = function() {
            buyOrderService.buy();
            $ionicLoading.show();
            $timeout(function() {
                $ionicLoading.hide();
                $scope.closeBuyorder();
            }, 3000);
        };

    })
    .controller('TabsCtrl', function($scope, $stateParams) {});
