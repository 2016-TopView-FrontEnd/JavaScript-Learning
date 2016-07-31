(function () {

function tran(objectList) {
	var userList = new Array();
	console.log('length' + objectList.length);
	for (var i = 0; i < objectList.length; i++) {
		var newUser = new User(objectList[i].name, objectList[i].id, 
			objectList[i].password, objectList[i].itemList, objectList[i].idCount);
		userList.push(newUser);
		var itemList = newUser.itemList;
		console.log(itemList);
		for (var j = 0; j < itemList.length; j++) {
			console.log(itemList[j]);
			itemList[j] = new Item(itemList[j].id, itemList[j].itemText, itemList[j].isCompleted, itemList[j].li);
			console.log(itemList[j]);
		}
	}
	return userList;
}

function storeData() {
	// if(model.getItemList().length != 0) {
	var itemListJSON = JSON.stringify(model.userList);
	console.log(itemListJSON);
	window.localStorage.setItem('userListJson', itemListJSON);
	// }
}

function getLocalData() {
	var userListJSON = window.localStorage.getItem('userListJson');
	var userList = JSON.parse(userListJSON);
	console.log('return' , userList);
	if(userList) {
		userList = tran(userList);
	}
	return userList;
}


function Item(id, itemText, isCompleted, li) {
	this.id = id;
	this.itemText = itemText;
	this.isCompleted = isCompleted || false;
	this.li = li || null;
}

Item.prototype.getIsCompleted = function () {
	return this.isCompleted;
};

Item.prototype.setIsCompleted = function (boolean) {
	return this.isCompleted = (arguments.length == 0) ? !this.isCompleted : boolean;
};


function User(name, id, password, itemList, idCount) {
	this.name = name || 'defaultUser';
	this.id = id || 0;
	this.password = password || '777';
	this.itemList = itemList || [];
	this.idCount = idCount || 0;
	// console.log(this.idCount);
}




function Model() {
	this.currentUser = null;
	this.userList = getLocalData() || [];


	this.setCurrentUser = function (userList, index) {
		return this.currentUser = (!!userList[index]) ?  userList[index] : (userList[index] = new User());
	};

	this.getItemList = function () {
		return this.currentUser.itemList;
	}

	this.getItem = function (id) {
		var itemList = this.currentUser.itemList;
		for (var i = 0; i < itemList.length; i++) {
			if(itemList[i].id == id) {
				return itemList[i];
			}
		}
	}

	this.addItem = function (itemText, id) {
		var itemId = id || (++ this.currentUser.idCount);
		var newItem = new Item(itemId, itemText);
		this.currentUser.itemList.push(newItem);
		return newItem;
	};

	this.deleteItem = function (id) {
		var index = this.currentUser.itemList.indexOf(this.getItem(id));
		this.currentUser.itemList.splice(index, 1);
	}

	this.setItemText = function (id, text) {
		return this.getItem(id).itemText = text;
	}

	this.eachItem = function (fun) {
		var itemList = this.currentUser.itemList;
		var length = itemList.length;	//防止删除元素时的影响
		for (var i = 0; i < length; i++) {
			fun(itemList[i]);
		}
	}

	this.getLocalData = getLocalData;
	this.storeData = storeData;
}

window.Model = Model;

})();