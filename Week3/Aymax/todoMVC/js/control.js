(function () {

function changePanel() {
	switch(this.title) {
		case '0' :
			view.presentPanel = 0;
			return showAll();
		case '1' :
			view.presentPanel = 1;
			return showActived();
		case '2' :
			view.presentPanel = 2;
			return showCompleted();
	}
}

function showAll() {
	model.eachItem(function () {
		view.showHideLi(arguments[0], 1);
	})
}

function showActived() {
	model.eachItem(function () {
		if(!arguments[0].isCompleted) 
			view.showHideLi(arguments[0], 1);
		else 
			view.showHideLi(arguments[0], 0);
	});
}

function showCompleted() {
	model.eachItem(function () {
		if(arguments[0].isCompleted) 
			view.showHideLi(arguments[0], 1);
		else 
			view.showHideLi(arguments[0], 0);
	});
}

/**
 * handler of btn-#clearCompleted
 */
function clearCompleted() {
	var itemDelArray = model.getItemList().filter(function (item) {
		return item.isCompleted == true;
	});
	deleteItem(itemDelArray, 1);
}

function clearAll() {
	model.getItemList().forEach(function (item) {
		view.removeLi(item);
	});
	model.getItemList().splice(0);
}

function initItemLi(itemLi) {
	itemLi.querySelector('.color-change-btn').addEventListener('click', editText, false);	//监听edit & save按钮
	itemLi.querySelector('.slidePoint').addEventListener('click', completeItem, false);	//监听 slidePoint
	itemLi.querySelector('.x-manBtnContainer').addEventListener('click', function () {
		deleteItem(this.parentNode.id, 0);
	}, false);	//监听删除按钮
}

function completeItem() {
	//添加下划线
	var id = parseInt(getIdFromNode.call(this));
	var itemTitle = this.parentNode.parentNode.querySelector('.itemTitle');
	var isCompleted = model.getItem(id).setIsCompleted();
	if(isCompleted){
		itemTitle.setAttribute('style', 'text-decoration: line-through; color: #a7a7a7;');
	}	else {
		itemTitle.setAttribute('style', 'text-decoration: none; color: #000;');
	}
}

function getIdFromNode() {
	var pattern = /--\d+/;
	return pattern.exec(this.id)[0].substring(2);
}
/**
 * btn - edit & save
 * 0 - edit
 * 1 - save
 */
function editText() {

	var textArea = this.parentNode.querySelector('#' + this.getAttribute('for'));
	var title = this.parentNode.parentNode.querySelector('.itemTitle');
	if(this.getAttribute('data-status') === '0') {
		//edit
		this.setAttribute('data-status', '1');
		textArea.removeAttribute('readonly');
		textArea.value = title.textContent;

	} else {
		//save
		this.setAttribute('data-status', '0');
		textArea.setAttribute('readonly', 'readonly');
		var id = getIdFromNode.call(textArea);
		title.textContent = textArea.value;
		model.setItemText(id, textArea.value);
	}
}


/**
 * deleteItem
 * @param {string} id  {array} itemDelArray 
 * @param {number} type 
 * 0 - id
 * 1 - itemDelArray
 */
function deleteItem(items, type) {
	if(type === 0) {
		view.removeLi(model.getItem(items));
		model.deleteItem(items);
	}
	else {
		items.forEach(function (item) {
			if(item.isCompleted) {
				view.removeLi(item);
				model.deleteItem(item.id);
			}
		});
	}
}

function init() {
	//初始化
	model.eachItem(function () {
		initItemLi(view.appendLi(arguments[0]));
	});

	// 监听输入框，输入后按 enter 添加新的item
	document.getElementById('itemInput').onchange = function () {
		var newItem = model.addItem(this.value);
		var newItemLi = view.appendLi(newItem);
		initItemLi(newItemLi);	
		this.value = null; //清空文本
	};
	//防止表单提交
	document.getElementsByTagName('form')[0].onsubmit = function () {
		return false;	
	};

	// 监听 All Completed Active 三个键
	var itemFilter = document.querySelectorAll('.itemFilter');
	for(var i = 0; i < itemFilter.length; i ++) {
		itemFilter[i].addEventListener('click', changePanel, false);
	}
	//监听下面两个键
	document.querySelector('#clearCompleted').addEventListener('click', clearCompleted, false);
	document.querySelector('#clearAll').addEventListener('click', clearAll, false);
	//关闭的时候保存
	window.addEventListener('beforeunload', function () {
		model.storeData();
	}, false);
}




function Controller() {
	this.model = window.model;
	this.view = window.view;


	this.init = init;
}

window.Controller = Controller;

})();