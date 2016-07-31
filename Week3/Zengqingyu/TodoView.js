TodoView = function(){
  var model = TodoModel;
  return {
    initTodo:function(){
      var todoInput = '<div id="todoInput">'+
            '<input type="text" id="inputText" placeholder="Lala">'+
            '<input type="button" id="addBtn" value="add">'+
            '</div><hr>';
      var todoBody = '<div id="todoBody"><ul id="list">'+
            '<li id="holderLi" class="listItem hidden">Nothing in this list</li></ul></div>';
      var todoSelect = '<div id="todoSelect"><nav id="selectNav">'+
            '<a class="selectBtn" id="all">All</a>'+
            '<a class="selectBtn" id="unComplete">Undo<div id="leftNum">0</div></a>'+
            '<a class="selectBtn" id="complete">Done</a>'+
            '<a class="selectBtn" id="completeAll">DoneAll</a>'+
            '<a class="selectBtn" id="clearAll" title="长按选择">ClearAll'+
              '<div class="hideList hidden" id="clearList">'+
                '<div class="selectBtn" id="clearDone">clearDone</div>'+
                '<div class="selectBtn" id="clearUndo">clearUndo</div>'+
              '</div>'+
            '</a>'+
            '</nav></div>';
      document.body.innerHTML = '<div id="todoFrame">'+todoInput+todoBody+todoSelect+'</div>';
      model.initData();
      this.initAllList();
      this.updateLeftNum();
      this.holderLiToggle();
      },
    
    initAllList:function(){
      var todoList = model.todoList;
      for (var i = 0,len=todoList.length; i < len; i++) {
        this.addTodo(todoList[i]);
      }
      $('#inputText').focus();
    },
    showAll:function(){
      var hideList = $('.hidden','#list');
      for(var i=0;i<hideList.length;i++){
        removeClass(hideList[i],'hidden');
      }
      this.holderLiToggle();
    },
    showComplete:function(){
      var checkboxs = $('.checkbox','#list');
      for(var i=0;i<checkboxs.length;i++){
        if(!checkboxs[i].checked){
          addClass(checkboxs[i].parentNode.parentNode,'hidden');
        }else{
          removeClass(checkboxs[i].parentNode.parentNode,'hidden');
        }
      }
      this.holderLiToggle();
    },
    showUnComplete:function(){
      var checkboxs = $('.checkbox','#list');
      for(var i=0,hasUndo=false;i<checkboxs.length;i++){
        if(checkboxs[i].checked){
          addClass(checkboxs[i].parentNode.parentNode,'hidden');
        }else{
          hasUndo = true;
          removeClass(checkboxs[i].parentNode.parentNode,'hidden');
        }
      }
      this.holderLiToggle();
    },
    setTodoDone:function(){
      this.updateLeftNum(); 
    },
    completeAll:function(){
      var completeAllBtn = $('#completeAll');
      completeAllBtn.innerHTML = "UndoneAll";
      completeAllBtn.id = 'unCompleteAll';
      this.updateLeftNum(); 
    },
    unCompleteAll:function(){
      var checkboxs = $('.checkbox','#list');
      for(var i=0;i<checkboxs.length;i++){
        checkboxs[i].checked = false;
      }
      var completeAllBtn = $('#unCompleteAll');
      completeAllBtn.innerHTML = "DoneAll";
      completeAllBtn.id = 'completeAll';
      this.updateLeftNum();     
    },
    showClearList:function(){
      removeClass($('#clearList'),'hidden');
    },
    hideClearList:function(){
      addClass($('#clearList'),'hidden');
    },
    clearAll:function(){
      var list = $('#list');
      var todoLis = $('li',list);
      for(var i=0,len=todoLis.length;i<len-1;i++){
        addClass(todoLis[i],'hidden');
      }
      removeClass(todoLis[len-1],'hidden');
      this.updateLeftNum();
      setTimeout(function(){
        list.innerHTML = '<li id="holderLi" class="listItem">Nothing in this list</div>';
      },600);

    },
    updateLeftNum:function(){
      var leftNum = model.leftNum;
      var leftNumBubble = $('#leftNum');
      leftNumBubble.innerText = model.leftNum;
      leftNumBubble.className = leftNum>0?'hasLeft':'noLeft';
    },
    addTodo:function(todo){
      var checked = todo.complete?'checked':'';
      var todoLi = document.createElement('li');
      todoLi.className = 'show';
      todoLi.innerHTML ='<div class="listCheckbox">'+
        '<input type="checkbox" class="checkbox" id="'+todo.id+'" '+checked+'/>'+
        '<label for="'+todo.id+'">✔</label>'+
        '</div>'+
        '<span class="listText">'+todo.value+'</span>'+
        '<div class="del">❌</div>'
      var list = $('#list');
      addFirstChild(list,todoLi);
      var liHeight = getStyle(todoLi,'height');
      var liPadding = getStyle(todoLi,'padding');
      var liMargin = getStyle(todoLi,'margin');
      todoLi.style.height = '0';
      todoLi.style.padding = '0';
      todoLi.style.margin = '0';
      setTimeout(function(){
        addClass(todoLi,'listItem');
        todoLi.style.height = liHeight;
        todoLi.style.padding = liPadding;
        todoLi.style.margin = liMargin;
        setTimeout(function(){
          todoLi.style.height = '';
        },500);
      },50);
    },
    removeTodoBySub:function(subEl){
    // delParent(subEl,{"height":"0","padding":0,"margin":0,"transform":'scaleX(0.9)'});
      addClass(subEl.parentNode,'hidden');
      setTimeout(function(){
        $('#list').removeChild(subEl.parentNode);
      },600);
      this.updateLeftNum();
    },
    removeDoneOrUndo:function(isDone){
      var checkboxs = $('.checkbox','#list');
      for(var i=0;i<checkboxs.length;i++){
        if(checkboxs[i].checked == isDone){
          this.removeTodoBySub(checkboxs[i].parentNode);
        }
      }
      this.updateLeftNum();
      this.holderLiToggle();
    },

    showHolderLi:function(){
      addClass($('#holderLi'),'hidden');
    },

    holderLiToggle:function(){
      var allLi = $('li','#list');
      if(allLi.length == 1){
        addClass($('#holderLi'),'hidden');
      }
      var hiddenLi = $('.hidden','#list');
      if((allLi.length-hiddenLi.length) > 0){
        addClass($('#holderLi'),'hidden');  
      }else{
        removeClass($('#holderLi'),'hidden');
      }
    },

    hideHolderLi:function(){
      addClass($('#holderLi'),'hidden');
    },

    showEmptyErr:function(){
      $('#inputText').style.borderColor = "#FFC1C1";
    },

    modifTodo:function(listText){
      listText.setAttribute('contenteditable',true);
    }
  }; 
}();

// TodoView.initTodo();