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
            var seq = 0;
            var onLoad = [];

            function url(id) {
                return '/tiles/' + id + '/{z}/{x}/{y}';
            }

            function setOverlays(o) {
                overlays = [o.l0, o.l1];
            }

            function addOnLoad(f) {
                onLoad.push(f);
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

            function flip(lseq) {
                if (lseq < seq)
                    return;

                overlays[bufferId].setZIndex(0);
                bufferId ^= 1;
                overlays[bufferId].setZIndex(1);
            }

            function load(id) {
                var lseq = ++seq;
                if (id == frontId)
                    return Promise.resolve();

                if (id == backId) {
                    flip();
                    return Promise.resolve();
                }

                if (id != preloadId)
                    preload(id);

                return preloadPromise.then(function() {
                    return Promise.all(onLoad.map(function(f) { return f(id); }));
                }).then(flip.bind(null, lseq));
            }

            this.setOverlays = setOverlays;
            this.addOnLoad = addOnLoad;
            this.preload = preload;
            this.load = load;
        });
})();
