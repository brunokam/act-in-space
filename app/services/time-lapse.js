'use strict';

(function () {

    angular.module('actinspace')
        .service('TimeLapse', ['TileLoader', function ($tileLoader) {
            var ids = null;
            var active = false;
            var slider = null;
            var timerId = null;
            var i = 1, S = -1;

            function work() {
                $tileLoader.load(ids[i]).then(function () {
                    if (!active)
                        return;
                    if (++i == S)
                        i = 0;
                    $tileLoader.preload(ids[i]);
                    timerId = setTimeout(work, 200);
                });
                slider.slider('setValue', i);
            }
            
            function init(ids_, s) {
                ids = ids_;
                S = ids.length
                slider = s;
            }
            
            function start() {
                if (active)
                    return;
                i = slider.slider('getValue');
                active = true;
                work();
            }
            
            function stop() {
                if (!active)
                    return;
                active = false;
                clearTimeout(timerId);
            }
            
            this.init = init;
            this.start = start;
            this.stop = stop;
        }]);
})();
