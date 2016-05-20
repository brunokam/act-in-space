/**
 * Created by brunokam on 20/05/2016.
 */

'use strict';

(function () {

    function initMap($scope) {
        angular.extend($scope, {
            // center: {
            //     autoDiscover: true,
            //     zoom: 13
            // },
            maxbounds: {
                southWest: {
                    lat: 43.5107129908437,
                    lng: 1.295013427734375
                },
                northEast: {
                    lat: 43.69270087644112,
                    lng: 1.550445556640625
                }
            },
            defaults: {
                minZoom: 12
            }
        });
    }

    function mapViewController($scope, $leaflet) {
        initMap($scope);
    }

    angular.module('actinspace', ['ngRoute', 'leaflet-directive'])
        .config(['$routeProvider', '$logProvider', function ($routeProvider, $logProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/map-view.html',
                controller: 'MapViewController'
            });

            $logProvider.debugEnabled(false);
        }])
        .controller('MapViewController', [
            '$scope',
            'leafletData',
            mapViewController
        ]);

})();
