/**
 * Created by brunokam on 21/05/2016.
 */

'use strict';

(function () {

    angular.module('actinspace')
        .service('TileLoader', function () {

            var overlays = null;
            var bufferId = 0;
            var frontId = '';
            var backId = '';
            var preloadId = '';
            var preloadPromise = null;

            function url(id) {
                return '/tiles/' + id + '/{z}/{x}/{y}';
            }

            function setOverlays(o) {
                overlays = [o.l0, o.l1];
            }

            function preload(id) {
                var back = overlays[bufferId ^ 1];
                preloadId = id;
                preloadPromise = new Promise(function (resolve, reject) {
                    back.setUrl(url(id));
                    back.addEventListener('load', onload);

                    function onload() {
                        back.removeEventListener('load', onload);
                        if (preloadId != id)
                            return;

                        preloadId = '';
                        backId = id;
                        resolve();
                    }
                });
            }

            function flip() {
                bufferId ^= 1;
                overlays[bufferId].bringToFront();
            }

            function load(id) {
                if (id == frontId)
                    return Promise.resolve();

                if (id == backId) {
                    flip();
                    return Promise.resolve();
                }

                if (id != preloadId)
                    preload(id);

                return preloadPromise.then(flip);
            }

            this.setOverlays = setOverlays;
            this.preload = preload;
            this.load = load;
        });
})();
