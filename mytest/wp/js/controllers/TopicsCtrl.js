myApp.controller('TopicsCtrl', function($scope, $timeout, $ionicModal, $ionicScrollDelegate, sj, windowInfo, price) {

    $scope.chartOption = sj.getChartOption(1)
    $scope.newprice = price.getPriceData();
    $scope.newprice.XAG1.changeType = "up";
    $scope.myChart = {
        'isShow': false
    };
    $scope.currentProduct = {
        name: '粤银',
        contract: 'XAG1',
        price: 333.33,
        currentSj: 1,
        currentCartIndex: 0,

    };

    require(
        [
            'echarts/echarts',
            'echarts/chart/k',
            'echarts/chart/line'
        ],
        function(ec) {
            //--- 折柱 ---
                $scope.myChart = ec.init(document.getElementById('kLine'));
                $scope.myChart.setOption($scope.chartOption, true);
                $scope.myChart.isShow = true;
        }
    );

    $scope.currentProduct.clickSj = 1;
    /*更改k线图像*/
    $scope.changeSJ = function(num) {
        $timeout.cancel($scope.changeSJTicket);
        $scope.currentProduct.clickSj = num;
        if ($scope.currentProduct.currentSj != num) {
            $scope.changeSJTicket = $timeout(function() {
                $scope.currentProduct.currentSj = num;
                $scope.myChart.showLoading();
                sj.getChartData(num, function() {
                    $scope.myChart.hideLoading();
                    $scope.chartOption = sj.getChartOption(num);
                    $scope.myChart.setOption($scope.chartOption, true);
                });


            }, 500);
        }

    }

    $scope.changeCallBack = function(index) {

        $timeout.cancel($scope.timer);
        $scope.timer = $timeout(function() {

            if ($scope.currentProduct.currentCartIndex != index) {
                $scope.currentProduct.price += 1;
                $scope.currentProduct.currentCartIndex = index;
            }
        }, 800);

    }

    $scope.windowInfo = windowInfo.getWindowInfo();

    $scope.chart_Height = $scope.windowInfo ? $scope.windowInfo.height - 332 : 300;

    $scope.protuct = [0, 1, 2, 3];

    $ionicModal.fromTemplateUrl('orders.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.OrdersModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeOrdersModal = function() {
        $scope.OrdersModal.hide();
    };

    // Open the login modal
    $scope.showOrdersModal = function() {

        $ionicScrollDelegate.scrollTop();
        $scope.OrdersModal.show();

    };
    $scope.$on('$destroy', function() {
        $scope.OrdersModal.remove();
    });

});
