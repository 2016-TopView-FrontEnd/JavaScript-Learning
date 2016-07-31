function Model(){
	  // var count = 0;
	  var self = this;
    self.store = [];
    self.arrStore = [];
    // self.localStore = new LocalStore(); 
	  self.createTodo = function(textValue){//创建新todo，调用存入本地方法
    	var item = {
    		pos: self.store.length,
      	text : textValue,
       	status : false
      };
      self.store.push(item);
      // self.arrStore[count.toString()] = item;
      // console.log(self.arrStore["0"]);
      // count++;
      return item;
	  };
	  self.saveTodo = function(objTodo){//存入本地
	  	
	    // self.localStore.saveTodo(self.store);
	  };

	  self.setTheItem = function(index,statusNew,textNew){
	    self.store[index].status = statusNew;
	    self.store[index].text = textNew;
	    console.log(self.store[index]);
	  };

	  self.deleteTodo = function(pos){
      self.store.splice(pos,1);
      self.changePos(pos);
      console.log(self.store);
	  };
	  self.changePos = function(posD){
      for (var i = posD; i < self.store.length; i++) {
      	self.store[i].pos--;
      }
	  }

	  self.getActiveList = function(){
	  	var list = [];
	  	for (var i = 0; i < self.store.length; i++) {
	  		if(self.store[i].status) list.push(self.store[i]);
	  	}
	  	return list;
	  }

};

