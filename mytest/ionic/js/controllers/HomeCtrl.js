angular.module('starter').controller('HomeCtrl', function($scope, $stateParams, $ionicModal, $timeout, $interval, $ionicLoading, orderService, priceService, products, utils) {

    // Form data for the login modal
    $scope.buyData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('buy_order.html', {
        scope: $scope
    }).then(function(buymodal) {
        $scope.buymodal = buymodal;
    });

    // Triggered in the login modal to close it
    $scope.closeBuy = function() {
        $scope.buymodal.hide();
    };

    // Open the login modal
    $scope.buy = function(id) {
        $scope.buyData.sl = 1;
        $scope.buyData.productId = id;
        $scope.buyData.buyType = 1;
        $scope.buyProduct = utils.findById($scope.allProductlists, id);
        $scope.buymodal.show();
    };
    $scope.doRefresh = function() {
        console.log("dorefresh");
        $timeout(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }, 2000);
    }

    $scope.doBuy = function() {
        $ionicLoading.show();
        console.log('Doing doBuy', $scope.buyData);
        orderService.buy($scope.buyData)
            .then(function(data) {
                $scope.closeBuy();
                $ionicLoading.hide();
                console.log($scope.buyData);
            })
            .catch(function(data) {
                console.log(data);
                $ionicLoading.show({
                    template: data.statusText,
                    noBackdrop: true,
                    hideOnStateChange: true
                });
                $timeout(function() {
                    $ionicLoading.hide();
                }, 1000);
            })
            .finally(function() {
                //  $ionicLoading.hide();
            });

    };

    ////////////////////////////////////////////////////////////
    $scope.$on('priceService.update', function(event) {

        priceService.all().then(function(data) {
            //  var _data = utils.newRandomPrice(data); 
            $scope.priceList = data;
        });
    });
    $scope.$on('orderService.update', function(event) {

        orderService.all().then(function(data) {
            $scope.orders = data;
        });
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

    };
    $scope.getOrderByproductId = function(productId) {
        var datalist = $scope.orders;
        if (angular.isArray(datalist)) {
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].productId == productId) {
                    return datalist[i];
                }
            }
        }
        return null;

    };

    $scope.allProductlists = products;



});
