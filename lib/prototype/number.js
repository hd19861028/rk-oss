Number.prototype.FileSize = function (format) {
    var r = ""
    var v = this.valueOf();
    var m = {
        0: 'B',
        1: 'K',
        2: 'M',
        3: 'G',
    }
    var l = 0;
    while (v > 1024) {
        v /= 1024;
        l += 1;
    }
    return `${v.toFixed(2)} ${m[l]}`;
}