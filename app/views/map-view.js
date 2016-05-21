/**
 * Created by brunokam on 20/05/2016.
 */

'use strict';

(function () {

    var ids = [
        'DS_PHR1A_201604111052119_FR1_PX_E001N43_0615_01712',
        'DS_PHR1A_201603301044531_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201603231048389_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201602051100204_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201601241052449_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201601171056299_FR1_PX_E001N43_0615_01768',
        'DS_PHR1A_201512171045376_FR1_PX_E001N43_0615_01768',
        'DS_PHR1A_201512031053291_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201510311057099_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201510171104376_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201509281100580_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201509161053246_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201509091057175_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201508261104571_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201506231056554_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201506041053076_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201506021108203_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201504181104116_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201504131053028_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201503111056545_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201503061045268_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201502131056503_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201411011057160_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201409171053053_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201409101057246_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201409031100531_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201408101046059_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201408011104559_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201406191045299_FR1_PX_E001N43_0615_01711',
        'DS_PHR1A_201406051053135_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201405221100463_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201405151104243_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201404141052385_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201404071056123_FR1_PX_E001N43_0615_01712',
        'DS_PHR1A_201403121056043_FR1_PX_E001N43_0615_01654',
        'DS_PHR1A_201312311053160_FR1_PX_E001N43_0615_01754',
        'DS_PHR1A_201312121049254_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201312101104326_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201311281056201_FR1_PX_E001N43_0615_01654',
        'DS_PHR1A_201310141052561_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201310071056401_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201309231104180_FR1_PX_E001N43_0615_01728',
        'DS_PHR1A_201307091049344_FR1_PX_E001N43_0615_01654'
    ].reverse();

    var dates = ids.map(function (id) {
        var m = id.match(/^DS_PHR1A_(\d{4})(\d{2})(\d{2})/);
        return m[1] + '/' + m[2] + '/' + m[3];
    });

    function initMap($scope) {
        angular.extend($scope, {
            defaults: {
                minZoom: 12,
                maxZoom: 16,
                fadeAnimation: false
            },
            layers: {
                overlays: {
                    l0: {
                        name: 'Youmapps-l0',
                        url: '/tiles/' + ids[0] + '/{z}/{x}/{y}',
                        type: 'xyz',
                        layerParams: {
                            showOnSelector: false
                        },
                        visible: true
                    },
                    l1: {
                        name: 'Youmapps-l1',
                        url: '/tiles/' + ids[1] + '/{z}/{x}/{y}',
                        type: 'xyz',
                        layerParams: {
                            showOnSelector: false
                        },
                        visible: true
                    }
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

    angular.module('actinspace')
        .controller('MapViewController', [
            '$scope',
            'leafletData',
            'TileLoader',
            function ($scope, $leaflet, $tileLoader) {
                initMap($scope);

                $scope.slider = $("#slider-init").slider({
                    id: 'slider',
                    min: 0,
                    max: ids.length - 1,
                    orientation: 'vertical',
                    value: 0,
                    reversed: true,
                    formatter: function (i) {
                        return dates[i];
                    }
                });

                $scope.slider.on('change', function (e) {
                    var newValue = e.value.newValue;

                    $tileLoader.load(ids[newValue]);
                });

                $leaflet.getMap('map').then(function (map) {
                    $leaflet.getLayers().then(function (layers) {
                        var overlays = layers.overlays;
                        $tileLoader.setOverlays(overlays);
                        var i = 1, S = ids.length;
                        //var j = 0;

                        function work() {
                            //var back = overlays['l'+j];
                            //var front = overlays['l'+j];
                            //j ^= 1;

                            //front.bringToFront();
                            //back.setUrl('/tiles/'+ids[i]+'/{z}/{x}/{y}');

                            $tileLoader.load(ids[i]).then(function () {
                                if (++i == S)
                                    i = 0;
                                $tileLoader.preload(ids[i]);
                                setTimeout(work, 500);
                            });

                            //if (++i == S)
                            //    i = 0;
                        }

                        //setInterval(work, 200);
                        // work();
                    });
                });


            }
        ]);
})();
