 myApp.directive('inputNumber', function() {
     return {
         restrict: 'AE',
         replace: true,
         scope: {
             buyCount: '=buycount',
             max: "@",
             min:"@"
         },
         template: '<div class="input_number row">' +
                     '<div class="col  button_wrap">'+
                        '<div class="input_button left_button" on-touch="minusBuyCount()"><i class="ion-minus-round" ></i></div>'+
                     '</div>' +
                     '<div class="col text-center" on-touch="show()" >'+
                        '<div  class="text-center number_value" ng-show="isshow">{{buyCount}}</div>'+
                        '<input type="tel" class="number_value" ng-hide="isshow" ng-model="buyCount">'+
                     '</div>'+
                      '<div class="col text-right button_wrap">'+
                        '<div class="input_button right_button" on-touch="plusBuyCount()"><i class="ion-plus-round" ></i></div>'+
                     '</div>' +
                '</div>',
         link: function(scope, element, attrs, accordionController) {
             var _attrs = attrs;
             var myelement = element;
             scope.isshow = true;
              scope.show = function(mythis) {
                scope.isshow =false;
                // mythis.focus();
             };
             scope.minusBuyCount = function() {
                 scope.buyCount = parseInt(scope.buyCount) - 1;
                 if (scope.buyCount < scope.min) {
                     scope.buyCount = scope.min;
                 }
                 scope.isshow =true;
             };
             scope.plusBuyCount = function() {

                 if (scope.buyCount < scope.max) {
                     myelement.removeClass("minusHidden");
                     myelement.removeClass("plusHidden");
                     scope.buyCount = parseInt(scope.buyCount) + 1;
                 } else {
                     myelement.addClass("plusHidden");
                 }
                 scope.isshow =true;

             };
         }
     }
 })
.directive('contenteditable', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            // view -> model
            elm.bind('keyup', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(elm.text());
                });
            });

            // model -> view
            ctrl.$render = function() {
                elm.html(ctrl.$viewValue);
            };

            // load init value from DOM
            ctrl.$setViewValue(elm.html());
        }
    };
});;
