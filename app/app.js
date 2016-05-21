/**
 * Created by brunokam on 21/05/2016.
 */

'use strict';

(function () {

    angular.module('actinspace', ['ngRoute', 'leaflet-directive'])
        .config(['$routeProvider', '$logProvider', function ($routeProvider, $logProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/map-view.html',
                controller: 'MapViewController'
            });

            $logProvider.debugEnabled(false);
        }]);
})();
