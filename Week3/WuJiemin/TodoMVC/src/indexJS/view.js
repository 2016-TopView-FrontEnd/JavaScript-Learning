/**
 * View构造函数
 */
function View() {
	
}

/**
 * 绑定事件侦听器( 事件处理程序 )
 * 
 * @param {String} event 事件名称
 * @param {function} handler 事件处理程序中会调用的一种回调函数
 * @param {Dom} dom 创建节点后要绑定事件的dom节点
 */
View.prototype.bind = function(event, handler, dom) {
	var self = this; 

	if (event == 'addItem') {
		document.getElementById('todoWriteConfirmButton').onclick = function() {

			var title = document.getElementById('todoWriteTxt').value;
			handler(title);

			document.getElementById('todoWriteTxt').value = ''; // 重置为空字符串
		}
	} else if (event == 'deleteItem') {
		// console.log(dom.childNodes[2]);
		dom.childNodes[2].onclick = function() {
			// console.log(this.parentNode);
			handler(this.parentNode);
		};
	} else if (event == 'setCompleted') {
		dom.childNodes[0].onchange = function () {
			handler(this.parentNode);
		}
	} else if (event == 'showAll') {
		var showAll_a = document.getElementById('showAll');
		showAll_a.onclick = function () {
			handler();
		}
	} else if (event == 'showActive') {
		var showActive_a = document.getElementById('showActive');
		showActive_a.onclick = function () {
			handler();
		} 
  } else if (event == 'showCompleted') {
		var showCompleted_a = document.getElementById('showCompleted');
		showCompleted_a.onclick = function () {
			handler();
		}
	} else if (event == 'clearCompleted') {
		var clearCompleted_a = document.getElementById('clearCompleted'); 
		clearCompleted_a.onclick = function () {
			handler();
		}
	} else if (event == 'signShow') {
			handler();
	} else if (event == 'signHide') {
		handler();
	} 
};

/**
 * 页面上添加todoItem
 * 
 * @param {Object} newTodoItem todo对象
 * 
 * @return {DOM-div} DOM节点(todoItem)
 */
View.prototype.addItem = function(newTodoItem) {
	var item = document.createElement('div');
	item.className = 'item';
	item.dataset.id = newTodoItem.id; // 用js代码添加 data-variable属性 用 dataset.variable
	item.dataset.completed = newTodoItem.completed;
	var checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = false;
	item.style.display = 'block';
	if (newTodoItem.completed === 'true') {
		checkbox.checked = true;
	} 
	var label = document.createElement('label');
	label.innerHTML =  newTodoItem.title;
	var button = document.createElement('button');
	button.innerHTML = 'delete';

	item.appendChild(checkbox);
	item.appendChild(label);
	item.appendChild(button);
	item.style.height = 'auto';
	var todos = document.getElementById('todos');
	todos.appendChild(item);

	// 设置初始样式
	if (checkbox.checked) {
		label.style.textDecoration = 'line-through';
		label.style.color = 'grey';			
	} else {
		label.style.textDecoration = 'none';
		label.style.color = 'black';	
	}
  return item;
}

/**
 * 页面上删除todoItem
 * 
 * @param {Node-div} TodoItem 要删除的DOM节点(todoItem)
 */
View.prototype.deleteItem = function (TodoItem) {
	var todos = TodoItem.parentNode;
	TodoItem.style.display = 'none';
	todos.removeChild(TodoItem);
}

/**
 * 根据是否完成而显示不同的效果
 * 
 * @param {DOM-div} updatedTodo 已修改completed属性值的todo
 */
View.prototype.setCompleted = function (updatedTodo) {
	var checkbox = updatedTodo.childNodes[0];
	var label = updatedTodo.childNodes[1];
	if (checkbox.checked) {
		label.style.textDecoration = 'line-through';
		label.style.color = 'grey';	
		updatedTodo.dataset.completed = true;		
	} else {
		label.style.textDecoration = 'none';
		label.style.color = 'black';	
		updatedTodo.dataset.completed = false;
	}
}

/**
 * 显示全部todo
 */
View.prototype.showAll = function () {
	var todosDom = document.getElementById('todos');
	// console.log(todosDom.childNodes);
	for (var i = 0; i < todosDom.childNodes.length; i++) {
		if (todosDom.childNodes[i].className == 'item') {
			todosDom.childNodes[i].style.display = 'block';
		}
	}
}

/**
 * 显示未完成的todo
 * 
 */
View.prototype.showActive = function () {
	var todosDom = document.getElementById('todos');
	// console.log(todosDom.childNodes);
	for (var i = 0; i < todosDom.childNodes.length; i++) {
		if (todosDom.childNodes[i].className == 'item') {
			if (todosDom.childNodes[i].dataset.completed == 'false') {
				todosDom.childNodes[i].style.display = 'block';
			} else {
				todosDom.childNodes[i].style.display = 'none';
			}
		}
	}	
}	

/**
 * 显示已完成的todo
 */
View.prototype.showCompleted = function () {
	var todosDom = document.getElementById('todos');

	for (var i = 0; i < todosDom.childNodes.length; i++) {
		if (todosDom.childNodes[i].className == 'item') {
			if (todosDom.childNodes[i].dataset.completed == 'true') {
				todosDom.childNodes[i].style.display = 'block';
			} else {
				todosDom.childNodes[i].style.display = 'none';
			}
		}
	}	
}

/**
 * 删除已完成的todo
 */
View.prototype.deleteCompleted = function () {
	var todosDom = document.getElementById('todos');
	var length = todosDom.childNodes.length;
	for (var i = 0; i < length; i++) {
		if (todosDom.childNodes[i].className == 'item') {
			// console.log(todosDom.childNodes[i].dataset.completed); // '字符串'
			if (todosDom.childNodes[i].dataset.completed === 'false') {
				todosDom.childNodes[i].style.display = 'block';
			} else {
				todosDom.childNodes[i].style.display = 'none';
				todosDom.removeChild(todosDom.childNodes[i]);
				
				// 关键 : 因为nodeList (这里指todosDom.childNodes) 是动态的
				i = 0;  
				length = todosDom.childNodes.length;
			}
		}
	}	
}
