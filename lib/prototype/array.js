Array.prototype.SubSet = function (arr) {
    var set1 = new Set(this.valueOf())
    var set2 = new Set(arr);
    var subset = [];

    for (let item of set1) {
        if (!set2.has(item)) {
            subset.push(item);
        }
    }

    return subset;
}