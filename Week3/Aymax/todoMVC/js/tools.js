/**
 * addClass to DOMElement
 * @param {string} className className
 */
Object.prototype.addClass = function(className) {
	if(!this.className){
		this.className = className;
	} else {
		this.className = this.className + ' ' + className;
	}
}

// Object.prototype.removeClass = function(className) {
// 	pattern = new RegExp(className);
// 	if(pattern.exec(this.className)) {

// 	} else {
// 		throw "doesn't have the class - " + classNpattern;
// 	}
// }


window.read = function (Array, fun) {
	//迭代器
	for (var i = 0; i < Array.length; i++) {
		fun(Array[i]);
	}
}