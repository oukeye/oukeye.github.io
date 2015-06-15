'use strict';
angular.module('starter.services', [])

.factory('priceService', function($http, $interval, $rootScope) {
        var path = 'data/price.json?v=5';

        var getPrice = function() {
            return $http.get(path).then(function(resp) {
                $rootScope.$broadcast('priceService.update');
                return resp.data.object;
            });
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
    .factory('productsService', function($http, utils) {

        var path = 'data/products.json?v=5';
        var products = $http.get(path).then(function(resp) {
            return resp.data.object;
        });

        var factory = {};
        factory.all = function() {
            return products;
        };
        factory.get = function(id) {
            return products.then(function(data) {
                return utils.findById(data, 'id', id);
            })
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


        };
    });;
