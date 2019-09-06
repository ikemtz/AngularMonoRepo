(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('imng-ngrx-utils', ['exports'], factory) :
    (global = global || self, factory(global['imng-ngrx-utils'] = {}));
}(this, function (exports) { 'use strict';

    var Payload = /** @class */ (function () {
        function Payload() {
        }
        return Payload;
    }());
    function createPayload(payload) {
        return { payload: payload };
    }

    exports.Payload = Payload;
    exports.createPayload = createPayload;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=imng-ngrx-utils.umd.js.map
