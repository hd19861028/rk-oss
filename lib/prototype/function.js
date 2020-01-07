Function.prototype.getName = function () {
	return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}