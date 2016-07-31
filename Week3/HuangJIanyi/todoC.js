var textInput = document.getElementById("textInput");//输入框
var todosList = document.getElementById("todosList");//todo列表
var allTodos = document.getElementById("todosList").getElementsByClassName("todoClass");//所有todo节点
var todoStateButton = document.getElementsByClassName("insideCircleClass");//状态按钮
var closeButtonClass = document.getElementsByClassName("closeButtonClass");//删除按钮
var insideCircleClass = document.getElementsByClassName("insideCircleClass");//状态按钮里面的小圆
var activeButton = document.getElementById("activeButton");
// var  = document.getElementsByClassName("");//

function Controller(){
	var self = this;
	  //给输入款加事件
		textInput.addEventListener('keyup',function(){
        var textValue = textInput.value;
        // if(textValue === "") {alert("BIE KONG");return false;}
        if (event.keyCode == "13") {  //回车键
        	 if(textValue == "" || textValue.match(/^\s+$/g)) { //判空
        	 	  alert("不要空，也不要全部空格，做人要认真");
        	 	  MVC.V.setTextNull();
        	 	  return ;
        	 	}
        	 
        	 //存储节点，显示节点
        	 var tempItem = MVC.M.createTodo(textValue);
        	 MVC.V.incNewTodo(textValue,tempItem.pos);
        	 MVC.V.setTextNull();

        	 //获得新建节点的下标
           var index = todoStateButton.length - 1;

           //给新节点的状态按钮加点击事件
           todoStateButton[index].addEventListener("click",function(){
           		var tempTodo = tempItem;
              MVC.M.setTheItem(tempTodo.pos,!(tempTodo.status),tempTodo.text);
              MVC.V.changeStatusButton(tempTodo.pos,tempTodo.status);
           },false);

           //给新建节点的删除按钮加点击事件
           closeButtonClass[index].addEventListener("click",function(){
           	 //  console.log(index);
           	 //  var obj = allTodos[index];
           	 //  console.log(obj);
           	 // todosList.removeChild(obj);
             var tempTodo = tempItem;
             MVC.M.deleteTodo(tempTodo.pos);
             MVC.V.deleteTodo(allTodos,tempTodo.pos);//1up\-1down
             console.log(MVC.M.store);
           },false);
 						
        }
		},false);


    //给active按钮加事件
    activeButton.addEventListener("click",function(){
      todosList.innerHTML = "";
      var activeList = MVC.M.getActiveList();
      for(var i = 0,len = activeList.length;i < len;i++){
           var tempItem = activeList[i];
           MVC.V.incNewTodo(tempItem.text,tempItem.pos);
           MVC.V.setTextNull();
           //获得新建节点的下标
           var index = todoStateButton.length - 1;
           console.log(tempItem);
           MVC.V.changeStatusButton(index,tempItem.status);
           //给新节点的状态按钮加点击事件
           todoStateButton[index].addEventListener("click",(function(index,tempItem){
            return function (e){
              var indexTemp = index;
              var tempTodo = tempItem;
              console.log(tempTodo);
              console.log("clickBefore: " + tempTodo.status);
              MVC.M.setTheItem(tempTodo.pos,!(tempTodo.status),tempTodo.text);
              MVC.V.changeStatusButton(indexTemp,tempTodo.status);
              console.log("clickAfter: " + tempTodo.status);
            };
           })(i,tempItem),false);

           //给新建节点的删除按钮加点击事件
           closeButtonClass[index].addEventListener("click",(function(index,tempItem){
            return function (e){
             var indexTemp = index;
             var tempTodo = tempItem;
             MVC.M.deleteTodo(tempTodo.pos);
             MVC.V.deleteTodo(allTodos,indexTemp);//1up\-1down
             console.log(MVC.M.store);
           };
           })(i,tempItem),false);
       }
    },false);
};
var MVC = {};
MVC.C = new Controller();
MVC.M = new Model();
MVC.V = new View();

// console.log(); 