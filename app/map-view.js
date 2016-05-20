/**
 * Created by brunokam on 20/05/2016.
 */

'use strict';

(function () {

    var mapLayer = {
        name: 'Youmapps',
        url: 'http://sandbox.youmapps.com/tiles/DS_PHR1A_201604111052119_FR1_PX_E001N43_0615_01712/{z}/{x}/{y}',
        type: 'xyz',
        layerParams: {
            showOnSelector: false
        }
    };

    function initMap($scope) {
        angular.extend($scope, {
            defaults: {
                minZoom: 12
            },
            layers: {
                baselayers: {
                    streets: mapLayer
                }
            },
            maxbounds: {
                southWest: {
                    lat: 43.5107129908437,
                    lng: 1.295013427734375
                },
                northEast: {
                    lat: 43.69270087644112,
                    lng: 1.550445556640625
                }
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
