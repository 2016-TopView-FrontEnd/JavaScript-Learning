/**
 * Model构造函数
 * 
 * @param {Storage} storage 作为Model实例storage属性的值
 */
function Model(storage) {
	this.storage = storage || null;
}

/**
 * 创建一条todo
 * 
 * @param {String} title 新todo对象的title属性
 * @param {function} callback 传递newTodoItem参数
 */
Model.prototype.create = function(title, callback) {
	var self = this;
	var newTodoItem = {
		'title' : title,
		'completed' : 'false',
		'id' : new Date().getTime().toString() // 生成id
	};

	self.storage.add(newTodoItem);
	callback(newTodoItem);
} // 该方法已测试没问题

/**
 * 调用self.storage.delete(id)删除某条todo
 * 
 * @param  {String} id 要删除的todo的id
 */
Model.prototype.delete = function (id) {
	var self = this;
	self.storage.delete(id);
} // 该方法已测试没问题

/**
 * 调用self.storage.update来修改某条todo
 * 
 * @param {String} id 要更新的todo的id值
 * @param {Object} updatedTodo 
 */
Model.prototype.update = function (id, updatedTodo) {
	this.storage.update(id, updatedTodo);
}

/**
 * 查找全部todo数据
 *
 * @return {Array} todos
 */
Model.prototype.findAll = function () {
	var todos = this.storage.findAll();
	return todos;
}

/**
 * 删除已完成的todo
 */
Model.prototype.deleteCompleted = function () {
	this.storage.deleteCompleted();
}
