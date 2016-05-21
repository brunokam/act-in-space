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
                                substructure: {
                                    name: 'Substructure',
                                    type: 'geoJSONShape',
                                    data: data,
                                    visible: true,
                                    layerParams: {
                                        showOnSelector: false
                                    },
                                    layerOptions: {
                                        style: function (feature) {
                                            return feature.properties;
                                        }
                                    }
                                }
                            });
                        } else {
                            reject(new Error(status));
                        }
                    });
                });
            };
        }]);
})();
