angular.module('starter')

.controller('IndexCtrl', function($scope, $stateParams, orderService) {
    $scope.orderCounts = 0; //默认没有订单
    $scope.$on('orderService.update', function(event) {
        orderService.all().then(function(data) {
            $scope.orders = data;
            $scope.orderCounts = data.length;
        });
    });

})
