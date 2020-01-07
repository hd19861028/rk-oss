String.prototype.Match = function (begin, end) {
	if (!this) return null;
	if (!begin) return this;
	if (end == undefined || end == null) return this;
	var sEnd = end;
	if (end.constructor == Array) {
		sEnd = end.join("|");
	}
	var reg = new RegExp(`${begin}(.*?)[${sEnd}]`);
	var s = this.match(reg);
	if (s != null) {
		var v = s[1];
		s = parseFloat(v);
	}
	return s;
}

String.prototype.Cut = function (begin, end) {
	if (!this) return null;
	if (!begin) return this;
	if (end == undefined || end == null) return this;
	var sIndex = this.indexOf(begin);
	if (sIndex == -1) return this;
	var eIndex = this.indexOf(end, sIndex + begin.length);
	return this.substring(sIndex + begin.length, eIndex)
}

var originTrim = String.prototype.trim;
String.prototype.trim = function () {
	let args = Array.prototype.slice.call(arguments);
	let str = originTrim.call(this.valueOf())
	if (args.length == 0) return str

	while (true) {
		var has = false;
		args.forEach(s => {
			if (str.startsWith(s)) {
				str = str.substr(s.length)
				has = true;
			}
			if (str.endsWith(s)) {
				str = str.substr(0, str.length - s.length)
				has = true;
			}
		})
		if (!has) break;
	}
	return str;
}