var iconv = require("iconv-lite");

Buffer.prototype.GBKDecode = function () {
	return iconv.decode(this, 'cp936')
}