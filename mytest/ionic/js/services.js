'use strict';
angular.module('starter.services', [])

.factory('userService', function($http) {
    var doRequest = function(username, path) {
        return $http({
            method: 'GET',
            url: 'data/price.json?v=1'
        });
    }
   
    return {
        price: function() {
            return doRequest();
        }
    };
})
.factory('productsService', function($http) {
    var doRequest = function(username, path) {
        return $http({
            method: 'GET',
            url: 'data/products.json?v=1'
        });
    }
   
    return {
        products: function() {
            return doRequest();
        }
    };
});
