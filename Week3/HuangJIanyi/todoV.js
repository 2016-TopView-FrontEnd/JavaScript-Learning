function View(){
	var self =  this;
  self.marginTop = 10;
  // self.topList = [];
  self.posList = [];
 
	self.incNewTodo = function(textValue,dataPos){
		self.posList.push(dataPos);

		var len = allTodos.length;

		// var lastHeight = todosList.offsetTop;
		
    var lastObjTop = (len - 1) < 0 ?  0 : parseInt(allTodos[len - 1].style.top) + allTodos[len - 1].offsetHeight;
    // if(len - 1 >= 0){
    // console.log(parseInt(allTodos[len - 1].style.top));
    // console.log(allTodos[len - 1].offsetHeight);}
    // console.log(lastObjTop);

		var tarObj = NewTodoHtml(textValue);
		var heightTemp = lastObjTop + self.marginTop; 
    tarObj.dataset.setPos = len;
		tarObj.dataset.setTop = heightTemp;
  	todosList.appendChild(tarObj);
    tarObj.style.top = heightTemp + "px";
		
    
	}
	//清空输入框
	self.setTextNull = function(){
		textInput.value = "";
  }
  //改状态按钮颜色
  self.changeStatusButton =function(pos,status){
    insideCircleClass[pos].style.backgroundColor = status? "green" : "red" ;
  }
  // 删除节点
  self.deleteTodo = function(list,posD){
  	// console.log(allTodos[posD]);
  	var height = list[posD].offsetHeight;
    todosList.removeChild(list[posD]);
    self.changePos(list,posD);
    self.partMove(list,posD,height,-1);
  }
  self.changePos = function(list,posD){
      for (var i = posD; i < list.length; i++) {
      	list[i].dataset.setPos = i;
      }
	  }
  //移动一部分节点
  self.partMove = function(list,pos,height,dir){//-1up\1down
    for (var i = pos ; i < allTodos.length; i++) {
    	console.log(list[i].dataset.setTop);
        list[i].dataset.setTop = parseInt(list[i].dataset.setTop) + (self.marginTop + height) * dir ;
      console.log(list[i].dataset.setTop);
        list[i].style.top = list[i].dataset.setTop + "px";
     }
  }
  self.showshowshow = function(list){
  	todosList.innerHTML = "";
  	 var lastHeight = 0;
     for(var i = 0,len = list.length;i < len;i++){
     	 var tarObj = NewTodoHtml(list[i].text);
			 var heightTemp = lastHeight + self.marginTop; 
   		 tarObj.dataset.setPos = list[i].pos;
			 tarObj.dataset.setTop = heightTemp;
			 todosList.appendChild(tarObj);
			 tarObj.style.top = heightTemp + "px";
       lastHeight = self.marginTop + tarObj.offsetHeight;
     }
  }


}

function NewTodoHtml(textValue){
	var tempDiv = document.createElement("div");
	tempDiv.innerHTML = '<div class="todoClass box">' +
        '<div class="items" >' +
            '<div class="outsideCircleClass">' +
                '<input type="checkbox" class="checkboxClass">' +
                '<div class="insideCircleClass"></div>' +
            '</div>' +
        '</div>' +
        '<div class="textClass items-center">' + textValue + '</div>' +
        '<div class="items" >' +
            '<div class="outsideCircleClass2">' +
                '<img src="pic/close21.png" class="closeButtonClass">' +
            '</div>' +
        '</div>' +
     '</div>' ;
   return tempDiv.childNodes[0];
}

