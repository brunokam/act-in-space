/**
 * Created by brunokam on 21/05/2016.
 */

'use strict';

(function () {

    angular.module('actinspace')
        .service('Layout', function ($http) {

            this.openRightSidebar = function () {
                var sidebar = $('#right-sidebar');

                if (sidebar.css('opacity') == 0) {
                    sidebar.animate({
                        right: '+=100px',
                        opacity: 1
                    }, 200);
                }
            };


            this.closeRightSidebar = function () {
                var sidebar = $('#right-sidebar');

                if (sidebar.css('opacity') == 1) {
                    sidebar.animate({
                        right: '-=100px',
                        opacity: 0
                    }, 200);
                }
            };
        });
})();
