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
