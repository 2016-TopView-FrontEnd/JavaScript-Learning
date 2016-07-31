function todomodel() {
	function todo(value, index, com) {
		this.value = value;
		this.index = index;
		this.completed = com;
	}
	var todoAry = new Array();
	return {
		add: function(value, index, com) {
			todoAry.push(new todo(value, index, com));
		},
		remove: function(index) {
			for(var i = 0; i<todoAry.length; i++) {
				if(todoAry[i].index == index) {
					todoAry.splice(i, 1);
				}
			}
		},
		isCom: function(index) {
			for(var i = 0; i<todoAry.length; i++) {
				if(todoAry[i].index == index) {
					if(todoAry[i].completed == 'false') {
						todoAry[i].completed = 'true';
					}
					else {
						todoAry[i].completed = 'false';
					}
				}
			}
		},
		clear: function() {
			for(var i = 0; i<todoAry.length; i++) {
				if(todoAry[i].completed == 'true') {
					todoAry.splice(i, 1);
					i--;
				}
			}
		},
		change: function(index, v, c) {
			var l;
			if(c == 'comple') {
				l = 'true';
			}
			else {
				l = 'false';
			}
			for(var i = 0; i<todoAry.length; i++) {
				if(todoAry[i].index == index) {
					todoAry.splice(i, 1, new todo(v, parseInt(index), l));
				}
			}
		}
		create: function() {
			var key = localStorage.getItem('keyname');
			var jAry = localStorage.getItem('MyTodo' + key);
			var atodo = JSON.parse(jAry);
			for(var i = 0; i<todoAry.length; i++) {
				todoAry.push(new todo(atodo[i].value, parseInt(atodo[i].index), atodo[i].completed));
			}
			return todoAry; 	//返回数组方便view层create
		},
		save: function() {
			var key = localStorage.getItem('keyname');
			var atodo = JSON.stringify(todoAry);
			localStorage.setItem('MyTodo' + key, atodo);
		}
	};
}


function todoview() {
	var position = document.getElementById('container');
	return {
		add: function(word, index, isCom) {
			var a = '';
			if(isCom == true) {
				a = 'comple';
			}
			else {
				a = 'imcom';
			}
			var li = "<label for='"+index+"'>√</label><button class='display' data-num='"+index+"'>X</button><input type='checkbox' id='"+index+"'><div class='"+a+"'>"+ word +"</div>"
			var l = document.createElement('li');
			l.innerHTML = li;
			position.appendChild(l);
			return l;   //返回节点用于添加事件
		}，
		remove: function(index) {
			var but = document.getElementsByTagName('button');
			for(var i = 0; i < but.length; i++) {
				if(but[i].dataset.num == index) {
					position.removeChild(but[i].parentNode);
				}
			}
		},
		comple: function(index) {
			var check = document.getElementsByTagName('input');
			for(var i = 0;i < check.length; i++) {
				if(check[i].id == index) {
					if(check[i].checked) {
						check[i].nextSibling.className = 'comple';
					}
					else {
						check[i].nextSibling.className = 'imcom';
					}
				}
			}
		},
		active: function(li) {
			var self = this;
			for(var i = 0; i < li.length; i++) {
				if(li[i].lastChild.className.indexOf('comple') != -1) {
					li[i].className = 'display';
				}
				else {
				 	li[i].className = 'displays';
				 }
				 li[i].onclick = function(){
				 	 self.act(li);
				 }
			}
		},
		com: function(li) {
			var self = this;
			for(var i = 0; i < li.length; i++) {
				if(li[i].lastChild.className.indexOf('comple') == -1) {
					li[i].className = 'display';
				}
				else {
				 	li[i].className = 'displays';
				 }
				 li[i].onclick = function(){
				 	 self.com(li);
				 }
			}
		},
		all: function(li) {
			for(var i = 0; i<li.length; i++) {
				if(li[i].className) {
				 	if(li[i].className.indexOf('display') != -1) {
				 		li[i].className = 'displays';
				 	}
			 		li[i].onclick = null;
			 	}
			}
		},
		clear: function(li) {
			for(var i = 0;i < li.length; i++) {
			  	if(li[i].lastChild.className.indexOf('comple') != -1) {
			 	  	this.position.removeChild(li[i]);
			 		i--;
			 	}
			}
		},
		// create: function(todoA) {
		// 	var self = this;
		// 	for(var i = 0; i < todoA.length; i++) {
		// 		var flag = parseInt(todoA.index);
		// 		var a = self.add(todoA[i].value, flag, todoA.completed);
		// 		a.firstChild.nextSibling.onclick = function(e) {
		// 			return function() {
						
		// 			}
		// 		}
		// 	}
		// }
	};
}