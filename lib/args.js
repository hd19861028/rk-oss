
module.exports = function (args) {
    var argMapping = {}
    args.forEach((arg) => {
        let key = "";
        let value = "";
        if (arg.indexOf('=') > 0) {
            let _t = arg.split('=')
            key = _t[0]
            value = _t[1]
        } else {
            key = arg
        }
        argMapping[key] = value;
    });
    return argMapping;
}