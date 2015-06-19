angular.module('starter').controller('HomeCtrl', function($scope, $stateParams, $ionicModal, $timeout, $interval,$ionicLoading, priceService,products,  utils) {

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

        $scope.allProductlists =  products;
        // Create the login modal that we will use later
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

        // Triggered in the login modal to close it
        $scope.closeBuyorder = function() {
            $scope.buymodal.hide();
        };
        // Perform the login action when the user submits the login form
        $scope.doBuyorder = function() {
            console.log('Doing doBuyorder');
            $ionicLoading.show();
            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $ionicLoading.hide();
                $scope.closeBuyorder();
            }, 3000);
        };

    });
