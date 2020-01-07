Date.prototype.Format = function (format) {
    var formatstr = format;
    var formatMap = [
        { f: 'yyyy', fn: 'getFullYear' },
        { f: 'yy', fn: 'getFullYear', cb: (y) => parseInt(y.toString().substr(2)) },
        { f: 'MM', fn: 'getMonth', cb: (m) => m + 1 },
        { f: 'dd', fn: 'getDate' },
        { f: 'HH', fn: 'getHours' },
        { f: 'hh', fn: 'getHours', cb: (h) => h > 12 ? h - 12 : h },
        { f: 'mm', fn: 'getMinutes' },
        { f: 'ss', fn: 'getSeconds' },
        { f: 'fff', fn: 'getMilliseconds' },
    ]
    var self = this;
    if (format != null && format != "") {
        var formatNum = (v, bit) => {
            var num = (v + Math.pow(10, bit))
            return num.toString().slice(1);
        }
        while (formatMap.length > 0) {
            var { f, fn, cb } = formatMap.shift();
            var len = f.length;
            var v = self[fn].call(this);
            if (cb !== undefined) v = cb(v);
            v = formatNum(v, len);
            var reg = new RegExp(f, 'g');
            formatstr = formatstr.replace(reg, v);
        }
    }
    return formatstr;
}