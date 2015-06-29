'use strict';
angular.module('starter.services', ['ngResource'])
    .factory('PersonService', function($http) {
        var BASE_URL = "http://api.randomuser.me/";
        var items = [];

        return {
            GetFeed: function() {
                return $http.get(BASE_URL + '?results=10').then(function(response) {
                    items = response.data.results;
                    return items;
                });
            },
            GetNewUser: function() {
                return $http.get(BASE_URL).then(function(response) {
                    items = response.data.results;
                    return items;
                });
            }
        }
    })
