/**
 * Controller构造函数
 * 
 * @param {Model} model 作为controller实例model属性的值
 * @param {[type]} view 作为controller实例view属性的值
 */
function Controller(model, view) {
	var self = this;

	this.model = model;
	this.view = view;

	self.view.bind('signIn', self.signIn.bind(self));
	self.view.bind('signUp', self.signUp.bind(self));

}

/**
 * [signIn description]
 * 
 * @param  {Dom-<a>} aTag a标签的Dom节点
 */
Controller.prototype.signIn = function (aTag) {
	var self = this;

	var userName = document.getElementById('userNameTxt').value;
	var password = document.getElementById('passwordTxt').value;
	if (userName.trim() ==='') {
		alert('对不起，用户名不能为空字符串！');
		return;
	}
	if (password.trim() === '') {
		alert('对不起，密码不能为空字符串！');
		return;
	}
	if (!self.model.isUserNameExisted(userName)) {
		alert('对不起，用户名不存在！\n\n请重新输入或注册用户！\n');
		return;
	}


	var user = {
		'userName': userName,
		'password': password
	};

	if (!self.model.find(user)) {
		alert('对不起，用户名或密码错误！');
		return;
	} else {
		var url = '../index.html#'+userName;
		aTag.href = url;
	}
}

/**
 * [signUp description]
 * @return {[type]} [description]
 */
Controller.prototype.signUp = function () {
	var self = this;

	var userName = document.getElementById('userNameTxt').value;
	var password = document.getElementById('passwordTxt').value;
	if (userName.trim() === '') {
		alert('对不起，用户名不能为空字符串！');
		return;
	}
	if (password.trim() === '') {
		alert('对不起，密码不能为空字符串！');
		return;
	}
	if (self.model.isUserNameExisted(userName)) {
		alert('对不起，用户名已存在！\n\n请重新输入用户名！\n');
		return;
	}

	self.model.add(userName, password);
	alert('恭喜你，注册成功！');

}

function start() {
	var storage = new Storage('todoUser');
	var model = new Model(storage);
	var view = new View();
	var controller = new Controller(model, view);
} 
 
start();