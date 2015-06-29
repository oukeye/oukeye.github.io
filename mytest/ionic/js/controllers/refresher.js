angular.module('starter').controller('RefresherCtrl', function($scope, $timeout, PersonService) {
    $scope.items = [];

    PersonService.GetFeed().then(function(items) {
        $scope.items = items;
    });

    $scope.doRefresh = function() {
        PersonService.GetNewUser().then(function(items) {
            $scope.items = items.concat($scope.items);

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

});
