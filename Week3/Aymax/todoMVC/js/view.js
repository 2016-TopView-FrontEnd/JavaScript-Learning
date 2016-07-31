(function () {

function createItemLi(item) {
	var str = '<li class="item show">' +
	'<div class="slideCheckbox"><input type="checkbox" id="slideCheckbox--' + item.id + '"><label class="slidePoint" id="slidePoint--' + item.id + '" for="slideCheckbox--' + item.id + '"></label></div>' +
	'<input type="checkbox" class="itemTitleCheckbox" id="itemTitleCheckbox--' + item.id + '"> <label class="itemTitle" id="itemTitle--' + item.id + '" for="itemTitleCheckbox--' + item.id + '">' + 'title' + '</label>' +
	'<div class="x-manBtnContainer"><div><div class="hr1"></div></div><div><div class="hr2"></div></div></div>' +
	'<div class="clearFloat"></div><div class="slidePanel"><textarea id="itemText--' + item.id + '" class="itemTextArea" cols="40" rows="4" readonly="readonly">' + item.itemText + '</textarea><label class="color-change-btn" for="itemText--' + item.id + '" data-status="0"></label></div></li>';
	var newItemLi = createDom(str);
	newItemLi.querySelector('.itemTitle').textContent = item.itemText;
	return newItemLi;
}

function itemTrough(item) {
	var itemTitle = document.querySelector('#itemTitle--' + item.id);
	if(item.isCompleted){
		itemTitle.setAttribute('style', 'text-decoration: line-through; color: #a7a7a7;');
	}	else {
		itemTitle.setAttribute('style', 'text-decoration: none; color: #000;');
	}
	if(item.isCompleted != item.li.querySelector('#slideCheckbox--' + item.id).checked) {
		item.li.querySelector('#slideCheckbox--' + item.id).checked = item.isCompleted;
	}
}

/**
 * show or hide a itemLi
 * @param  {li} itemLi 
 * @param  {boolean}
 * 1 - show
 * 0 - hide
 */
function showHideLi(item, type) {
	item.li.style.display = (type == 1) ? 'block' : 'none';
}

function createDom(str) {
	var div = document.createElement('div');
	div.innerHTML = str;
	return div.childNodes[0];
}

function appendLi(item) {
	var newItemLi = createItemLi(item);
	console.log('append ', item);
	item.li = newItemLi;
	newItemLi.id= item.id;
	if(window.view.presentPanel == 2) {
		newItemLi.style.display = 'none';
	}
	view.itemContainer.appendChild(newItemLi);	//把新建的li添加到ul
	itemTrough(item);
	return newItemLi;
}

function removeLi(item) {
	view.itemContainer.removeChild(item.li);
}

function View() {
	this.presentPanel = 0;
	this.itemContainer = document.querySelector('#itemContainer');


	this.createItemLi = createItemLi;
	this.appendLi = appendLi;
	this.removeLi = removeLi;
	this.showHideLi = showHideLi;
	this.itemTrough = itemTrough;
}

window.View = View

})();