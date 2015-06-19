angular.module('starter')
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

    });
