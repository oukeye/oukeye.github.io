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
    .factory('productsService', function($http) {

        var path = 'data/products.json?v=5';
        var products = $http.get(path).then(function(resp) {
            return resp.data.object;
        });

        var factory = {};
        factory.all = function() {
            return products;
        };
        factory.get = function() {
            return products.then(function() {
                return products;
            })
        };

        return factory;
    })
    .factory('utils', function() {
        return {
            // Util for finding an object by its 'id' property among an array
            findById: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == id) return a[i];
                }
                return null;
            },

            // Util for returning a random key from a collection that also isn't the current key
            newRandomNum: function newRandomNum(max,min) {
                var randKey = Math.floor(Math.random() * (max - min + 1) + min);
                return randKey;
            },
            newRandomPrice:function(){

            }
        };
    });;
