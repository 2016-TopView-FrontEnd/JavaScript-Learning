/**
 * Storage构造函数
 * 
 * @param {String} name 作为storage实例dbName属性的值
 */
function Storage(name) {
	this.dbName = name;
	if (!localStorage[name]) {
		var data = {
			'todoUsers':[]
		};

		localStorage[name] = JSON.stringify(data);
	}
}	

/**
 * 添加用户
 * @param {Object} user 
 */
Storage.prototype.add = function (user) {
	var data = JSON.parse(localStorage[this.dbName]);
	var users = data.todoUsers;
	
	users.push(user);

	localStorage[this.dbName] = JSON.stringify(data);
}

/**
 * 查找用户
 * @param  {[type]} userName 要查找的userName
 * @return {Object} 有结果返回user，没结果则返回null
 */
Storage.prototype.find = function (userName) {
	var data = JSON.parse(localStorage[this.dbName]);
	var users = data.todoUsers;

	for (var i = 0; i < users.length; i++) {
		if (users[i].userName === userName) {
			return users[i];
		}
	}

	return null;
}
