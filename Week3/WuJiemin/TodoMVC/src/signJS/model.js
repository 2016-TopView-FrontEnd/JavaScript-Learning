/**
 * Model构造函数
 * 
 * @param {Storage} storage 作为Model实例storage属性的值
 */
function Model(storage) {
	this.storage = storage || null;
}

/**
 * 添加用户
 * 
 * @param {String} userName 
 * @param {String} password 
 */
Model.prototype.add = function (userName, password) {
	var self = this;

	var user = {
		'userName':userName,
		'password':password
	};

	self.storage.add(user);

};

/**
 * 查询用户
 * 
 * @param  {Object} user 
 * @return {Boolean} boolean 存在并密码正确返回true，否则返回false
 */
Model.prototype.find = function (user) {
	var userInStorage = this.storage.find(user.userName);
	if (userInStorage && userInStorage.password === user.password) {
		return true;
	}

	return false;
}

/**
 * 判断用户名是否已存在
 * 
 * @param {String} userName 
 * @return {Boolean} boolean 存在返回true，否则返回true
 */
Model.prototype.isUserNameExisted = function (userName) {
	var userInStorage = this.storage.find(userName);
	if (!userInStorage) {
		return false;
	}

	return true;
}