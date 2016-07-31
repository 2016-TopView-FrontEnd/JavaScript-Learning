TodoCtrl = function(){
  var model = TodoModel;
  var view = TodoView;

  var ctrl = {

    start:function(){
      var self =this;
      view.initTodo();
      $('#inputText').addEventListener('keyup',function(ev){
        var oEvent = ev || window.event;
        if(oEvent.keyCode == 13 && oEvent.ctrlKey){
          var addTodoEvt = new MouseEvent('click',{
            bubble:true,
            cancelable:true,
            view:window
          });
          $('#addBtn').dispatchEvent(addTodoEvt);
        }
      });

      $('#addBtn').addEventListener('click',function(){
        var todoValue = $('#inputText').value;
        if(isEmpty(todoValue)){
          todoValue = '我什么都不想干😛';
        }
        var newTodo = self.newTodo(todoValue);
        model.addTodo(newTodo);
        view.addTodo(newTodo);
        view.updateLeftNum();
        view.holderLiToggle();
      });

      $('#leftNum').addEventListener('mousedown',function(ev){
        var oEvent = ev||window.event;
        var originTop = this.offsetTop;
        var originLeft = this.offsetLeft;
        var disX = oEvent.pageX - originLeft;
        var disY = oEvent.pageY - originTop;
        var self = this;
        document.onmousemove = function(ev){
          var oEvent = ev||window.event;
          self.style.transitionDuration = '0.1s';
          self.style.left = oEvent.pageX - disX +'px';
          self.style.top = oEvent.pageY - disY + 'px';
          document.onmouseup = function(){
            self.style.transitionDuration = '0.5s';
            var parentHeight = self.parentNode.offsetHeight;
            var parentWidth = self.parentNode.offsetWidth;
            var nowTop = self.offsetTop;
            var nowLeft = self.offsetLeft;
            if(nowTop<-self.offsetHeight||nowTop>parentHeight||nowLeft<-self.offsetWidth||nowLeft>parentWidth){
              model.setAllTodo(true);
              var checkboxs = $('.checkbox','#list');
              for(var i=0;i<checkboxs.length;i++){
                checkboxs[i].checked = true;
              }
              view.updateLeftNum();
            }

            self.style.left = originLeft+'px';
            self.style.top = originTop+'px';
            this.onmousemove = this.onmouseup = null;
          }
        }
      });

      $('#list').addEventListener('click',function(ev){
        var oEvent = ev||window.event;
        var clickOn = oEvent.target;
        // var clickOnId = $('.checkbox',clickOn.parentNode)[0].id;
        if(hasClass(clickOn, 'del')){
          var clickOnId = $('.checkbox',clickOn.parentNode)[0].id;
          model.removeTodoById(clickOnId);
          view.removeTodoBySub(clickOn);
          view.holderLiToggle();
        //delParent(clickOn,{"height":"0","padding":0,"margin":0,"transform":'scaleX(0.9)'});
        }else if(clickOn.tagName.toLowerCase() == 'label'){
          var clickOnId = $('.checkbox',clickOn.parentNode)[0].id;
          model.setTodoDoneById(clickOnId);
          view.setTodoDone();

        }else if(clickOn.tagName.toLowerCase() == 'span'){
          view.modifTodo(clickOn);
          this.focus();
          clickOn.onkeyup = function(ev){
            var oEvent = ev||window.event;
            if(oEvent.keyCode == 13&&oEvent.ctrlKey){
              this.blur();
            }
          };
          clickOn.onblur = function(){
            var clickOnId = $('.checkbox',clickOn.parentNode)[0].id;
            this.removeAttribute('contenteditable');
            model.modifTodo(clickOnId,getText(this));
          };
        }
      });
      // 
      $('#selectNav').addEventListener('mousedown',function(ev){
        var oEvent = ev || window.event;
        var clickOn = oEvent.target;
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
        if(hasClass(clickOn,'selectBtn')){
          // clickOn.style.transform = 'scale(0.9,0.9)';
          switch(clickOn.id){
            case 'all': 
              view.showAll();
              break;
            case 'unComplete' : 
              view.showUnComplete();
              break;
            case 'complete' : 
              view.showComplete();
              break;
            case 'completeAll':
              model.setAllTodo(true);
              var checkboxs = $('.checkbox','#list');
              for(var i=0;i<checkboxs.length;i++){
                checkboxs[i].checked = true;
              }
              view.completeAll();
              break;
            case 'unCompleteAll':
              model.setAllTodo(false);
              view.unCompleteAll();
              break;
            case 'clearAll':
              var downTime = 0;
              var timer = setInterval(function(){
                downTime += 0.1;
                if(downTime>=0.6){
                  clearInterval(timer);
                  view.showClearList();
                  clickOn.onmouseout=function(){
                    var timeout = setTimeout(function(){
                      view.hideClearList();
                      clickOn.onmouseout = null;
                      clearTimeout(timeout);
                    },700);
                    this.onmouseover=function(){
                      clearTimeout(timeout);
                    }
                  }
                }
              },100);
              document.onmouseup=function(){
                if(downTime<0.6){
                  clearInterval(timer);
                  model.removeAll();
                  view.clearAll();
                }
                document.onmouseup=null;
              };
              break;
            case 'clearDone':
              model.removeDoneOrUndo(true);
              view.removeDoneOrUndo(true);
              break;
            case 'clearUndo':
              model.removeDoneOrUndo(false);
              view.removeDoneOrUndo(false);
              break;
          }
        }
      });
      
      window.addEventListener('beforeunload',function(){
        model.saveLocalData();
      });
    },
    newTodo:function(todoValue){
      // console()
      var newTodoId = model.getAnTodoId();
      return {
        id:newTodoId,
        value:todoValue,
        complete:false
      }
    },
  };
  return ctrl;
}();
