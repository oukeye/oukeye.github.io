angular.module('starter')

.controller('PositionsCtrl', function($scope, $stateParams, orderService, products, priceService,utils) {

    $scope.$on('orderService.update', function(event) {
        orderService.all().then(function(data) {
            $scope.orders = data;
        });
    });
    $scope.allProductlists = products;

    $scope.getProductByproductId = function(productId) {
        var datalist = $scope.allProductlists;
        if (angular.isArray(datalist)) {
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].id == productId) {
                    return datalist[i];
                }
            }
        }
        return null;

    };
    ////////////////////////////////////////////////////////////
    $scope.$on('priceService.update', function(event) {
        priceService.all().then(function(data) {
            $scope.priceList = data;
        });
    });
    $scope.getPriceByProductId = function(id) {
        var _p = $scope.getProductByproductId(id);
        var datalist = $scope.priceList;
        if (angular.isArray(datalist)) {
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].contact_code == _p.contact_code) {
                    return datalist[i];
                }
            }
        }
        return null;

    };
    $scope.getOrderById = function(id) {
        var datalist = $scope.orders;
        if (angular.isArray(datalist)) {
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].orderId == id) {
                    return datalist[i];
                }
            }
        }
        return null;

    };
    $scope.getOrderProfit = function(orderid) {
        var profit = 0;
        var order = $scope.getOrderById(orderid);
        if (typeof order == null) {
            return profit;
        }
        var price = $scope.getPriceByProductId(order.productId);
        if (price == null) {
            return profit;
        }
        var product = $scope.getProductByproductId(order.productId);
        if (product == null) {
            return profit;
        }
        var newprice = price.latest_price;

        switch (order.buyType) {
            case '1':
                profit = (newprice - order.buyPrice) * product.yk * order.sl
                break;

            case '2':
                profit = (order.buyPrice - newprice) * product.yk * order.sl
                break;
        }
        return parseFloat(profit).toFixed(utils.numPointlength(product.yk));

    };
})
