'use strict';
angular.module('starter.services', ['ngResource'])
    .factory('orderService', function($http, $q, $interval, $rootScope, productsService, utils) {
        var path = 'data/order.json?v=5';
        var getOrder = function() {
            return $http.get(path).then(function(resp) {
                $rootScope.$broadcast('orderService.update');
                /* var dataList = resp.data.object;
                 for (var i = 0; i < dataList.length; i++) {
                     var _newPrice = 0;
                     var _yk = 0;
                     productsService.get(dataList[i].productId).then(function(data) {
                         _yk = data.yk;
                     });
                     utils.orderProfit(_newPrice, dataList[i].buyPirce, _yk, dataList[i].sl, dataList[i].buyType);
                 }*/
                productsService.get(function(data) {
                    console.log(data);
                });
                return resp.data.object;
            });
        }
        var orders = getOrder();
        $interval(function() {

            orders = getOrder();
        }, 3000);

        var factory = {};

        factory.all = function() {
            return orders;
        };
        var BASE_URL = "http://api.randomuser.me/";
        var items = [];
        factory.buy = function(orderobj) {
            return $http.get(BASE_URL + '?results=10').then(function(response) {
                items = response.data.results;
                return orders;
            });

        };
        factory.getById = function(orderId) {
            return orders.then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].orderId == orderId) {
                        return data[i];
                    }
                }

            });
            return null;
        };
        return factory;
    })
    .factory('priceService', function($http, $interval, $rootScope, utils) {
        var path = 'data/price.json?v=5';

        var getPrice = function() {
            return $http.get(path).then(function(resp) {
                $rootScope.$broadcast('priceService.update');

                return utils.newRandomPrice(resp.data.object);
            });
            /*.then(function(resp) {
                $rootScope.$broadcast('priceService.update');
                return resp.data.object;
            });*/
        }
        var prices = getPrice();
        $interval(function() {

            prices = getPrice();

        }, 3000);

        var factory = {};

        factory.all = function() {
            return prices;
        };

        return factory;
    })
    .factory('productsService', function($http, $q, utils) {

        var path = 'data/products.json?v=5';
        var products = function() {
            return $http({
                method: 'get',
                url: path
            }).then(function(resp) {
                return utils.newRandomPrice(resp.data.object);
            });
        };

        var factory = {};
        factory.all = function() {
            return products();
        };
        factory.get = function() {
            return products();
        };

        return factory;
    })
    .factory('utils', function() {
        var _numlength = function(num) {
            if (typeof(num) != "undefined") {
                var _list = num.toString().split(".");
                if (typeof(_list[1]) != "undefined") {
                    return _list[1].length;
                }

            } else {
                return 0;
            }

        };

        // Util for finding an object by its 'id' property among an array
        var _findById = function(a, val) {

            for (var i = 0; i < a.length; i++) {
                if (a[i].id == val) {
                    return a[i]
                };
            }
            return null;
        };
        var _newRandomNum = function(max, min, num) {
            var randKey = parseFloat(Math.random() * (max - min + 1) + min).toFixed(_numlength(num));
            return randKey;
        };
        var _newRandomPrice = function(data) {
            for (var i = 0; i < data.length; i++) {
                var _v = data[i].latest_price;
                var _m = parseFloat(_v);
                var _v_last = _m + parseFloat(_newRandomNum(10, -10, _m));

                if (_v_last > _v) {
                    data[i].trend = true;
                } else if (_v_last < _v) {
                    data[i].trend = false;
                }
                data[i].latest_price = parseFloat(_v_last).toFixed(_numlength(_m));
            }
            return data;
        };
        var _orderProfit = function(newPrice, buyPirce, yk, sl, buyType) {
            var profit = 0;
            switch (buyType) {
                case '1':
                    profit = (newPrice - buyPirce) * yk * sl;
                    break;

                case '2':
                    profit = (buyPirce - newPrice) * yk * sl;
                    break;
            }
            return profit;
        }
        return {
            // Util for finding an object by its 'id' property among an array
            findById: function(a, val) {
                return _findById(a, val);
            },
            numPointlength: function(num) {
                return _numlength(num)
            },
            // Util for returning a random key from a collection that also isn't the current key
            newRandomNum: function(max, min, num) {

                return _newRandomNum(max, min, num);
            },
            newRandomPrice: function(data) {
                return _newRandomPrice(data);
            },
            orderProfit: function(newPrice, buyPirce, yk, sl, buyType) {
                return _orderProfit(newPrice, buyPirce, yk, sl, buyType);
            }


        };
    });
