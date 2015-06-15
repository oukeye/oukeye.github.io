'use strict';
angular.module('starter.directives', [])

.directive('swiperDirective', function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.addClass("test");

                var mySwiper = $(element).swiper({
                    pagination: '.swiper-pagination-type',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: "auto",
                    loopedSlides: 3,
                    loop: true,
                    coverflow: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true
                    }
                });
            }
        }
    })
    .directive('numberinputDirective', function() {
        return {
            restrict: 'EA',
            replace: true,

            template: '<div class="input-group" style="width:65%;">' 
             + '<span class="input-group-addon ion-minus-round positive" ng-click="minusBuyCount($event)"></span>'
             + '<input type="text" class="form-control" placeholder="手数" ng-model="buyCount">' 
             + '<span class="input-group-addon ion-plus-round button-positive" ng-click="plusBuyCount($event)"></span>' 
             + '</div>',
            link: function(scope, element, attrs, accordionController) {

                scope.minusBuyCount = function($event) {
                    scope.buyCount = parseInt(scope.buyCount) - 1;
                    if (scope.buyCount < 1) {
                        scope.buyCount = 1;
                    }
                };
                scope.plusBuyCount = function($event) {
                    scope.buyCount = scope.buyCount + 1;
                    console.log(scope.buyCount + 'plusBuyCount');
                };
            }
        }
    });
