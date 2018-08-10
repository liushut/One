var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    var Util = (function () {
        function Util() {
        }
        /**
         * _str按utf8截取_len，后面补...
         */
        Util.getChar = function (_str, _len) {
            var _ba = new egret.ByteArray;
            _ba.writeUTFBytes(_str);
            if (_ba.length < _len)
                return _str;
            _ba.position = 0;
            return _ba.readUTFBytes(_len) + "...";
        };
        /**
         * format("{0} is {1}", "he", "beautiful")
         */
        Util.strFormat = function (str) {
            var replaceArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                replaceArgs[_i - 1] = arguments[_i];
            }
            return str.replace(/\{(\d+)\}/g, function (m, i) {
                return replaceArgs[i];
            });
        };
        /**
         * 获取当前时间戳
         */
        Util.timeStamp = function (dateStr) {
            dateStr = dateStr || new Date().toString();
            return Date.parse(dateStr) / 1000;
        };
        /**
         * utf8码转string
         */
        Util.Utf8ArrayToStr = function (array) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = array.length;
            i = 0;
            while (i < len) {
                c = array[i++];
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        // 0xxxxxxx
                        out += String.fromCharCode(c);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx   10xx xxxx
                        char2 = array[i++];
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = array[i++];
                        char3 = array[i++];
                        out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        };
        /**
         * 获取类名string
         */
        Util.getClassName = function (obj) {
            if (obj && obj.constructor && obj.constructor.toString()) {
                /*
                 * for browsers which have name property in the constructor
                 * of the object,such as chrome
                 */
                if (obj.constructor.name) {
                    return obj.constructor.name;
                }
                var str = obj.constructor.toString();
                /*
                 * executed if the return of object.constructor.toString() is
                 * "[object objectClass]"
                 */
                if (str.charAt(0) == '[') {
                    var arr = str.match(/\[\w+\s*(\w+)\]/);
                }
                else {
                    /*
                     * executed if the return of object.constructor.toString() is
                     * "function objectClass () {}"
                     * for IE Firefox
                     */
                    var arr = str.match(/function\s*(\w+)/);
                }
                if (arr && arr.length == 2) {
                    return arr[1];
                }
            }
            return undefined;
        };
        /**
         * obj转json转ByteArray
         */
        Util.objToByteArray = function (obj) {
            var aji = JSON.stringify(obj);
            var ba = new egret.ByteArray();
            ba.writeUTF(aji);
            return ba;
        };
        /**
         * objToByteArray的bytes
         */
        Util.objToBytes = function (obj) {
            return this.objToByteArray(obj).bytes;
        };
        /**
         * bytes转ByteArray转json转obj
         */
        Util.bytesToObj = function (bytes) {
            var ba = new egret.ByteArray(bytes);
            var obj = JSON.parse(ba.readUTF());
            return obj;
        };
        /**
         * Array移除元素
         */
        Util.rmArrayObj = function (array, obj) {
            if (array.indexOf(obj) != -1) {
                return array.splice(array.indexOf(obj), 1);
            }
        };
        return Util;
    }());
    ZJ.Util = Util;
    __reflect(Util.prototype, "ZJ.Util");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=Util.js.map