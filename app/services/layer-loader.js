/**
 * Created by brunokam on 21/05/2016.
 */

'use strict';

(function () {

    angular.module('actinspace')
        .service('LayerLoader', ['$http', function ($http) {

            this.getSubstructure = function () {
                return new Promise(function (resolve, reject) {

                    $http.get('substructure/example.geojson').success(function (data, status) {
                        if (status == 200) {
                            resolve({
                                name: 'Substructure',
                                type: 'geoJSONShape',
                                data: data,
                                visible: false,
                                layerParams: {
                                    showOnSelector: false
                                },
                                layerOptions: {
                                    style: function (feature) {
                                        return feature.properties;
                                    }
                                }
                            });
                        } else {
                            reject(new Error(status));
                        }
                    });
                });
            };


            this.getAnomaly = function () {
                return new Promise(function (resolve, reject) {

                    $http.get('anomaly/example.geojson').success(function (data, status) {
                        if (status == 200) {
                            resolve({
                                name: 'Anomaly',
                                type: 'geoJSONShape',
                                data: data,
                                visible: false,
                                layerParams: {
                                    showOnSelector: false
                                },
                                layerOptions: {
                                    style: function (feature) {
                                        return feature.properties;
                                    }
                                }
                            });
                        } else {
                            reject(new Error(status));
                        }
                    });
                });
            };

            this.getAlert = function () {
                return new Promise(function (resolve, reject) {

                    $http.get('alert/example.json').success(function (data, status) {
                        if (status == 200) {
                            var markers = {};
                            data.forEach(function (element, i) {
                                markers['alert' + i] = {
                                    layer: 'alert',
                                    lat: element[0],
                                    lng: element[1],
                                    icon: {
                                        iconUrl: 'alert/icon.png',
                                        iconSize: [32, 32]
                                    }
                                };
                            });

                            resolve({
                                layer: {
                                    type: 'group',
                                    name: 'alert',
                                    visible: false,
                                    layerParams: {
                                        showOnSelector: false
                                    }
                                },
                                markers: markers
                            });
                        } else {
                            reject(new Error(status));
                        }
                    });
                });
            };
        }]);
})();
