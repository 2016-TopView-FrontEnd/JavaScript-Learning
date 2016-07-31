/**
 * View构造函数
 */
function View() {
}

/**
 * 事件侦听器
 * 
 * @param {String} event   
 * @param {Function} handler 
 */
View.prototype.bind = function (event, handler) {
	var self = this;

	if (event === 'signIn') {
		var signInBtn = document.getElementById('signInBtn');
		signInBtn.onclick = function () {
			handler(this.parentNode);
		}
	} else if (event === 'signUp') {
		var signUpBtn = document.getElementById('signUpBtn');
		signUpBtn.onclick = function () {
			handler();
		}
	}
};