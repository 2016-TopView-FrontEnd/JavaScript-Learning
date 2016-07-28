### 由于我github炸了，只能这样了
# js设计模式之MVC
##### 不BB，直入主题。
### MVC即模型（model）——视图（view）——控制器（controller）,是一种把业务逻辑，数据，属兔分离的架构代码方式。组件化开发就是其最经常的实现。
<h3>首先我们大致地划分一下M,V,C：</h3>

## M——model:  即模型，如果不太清楚模型的定义，那么就加上两个字---数据，即数据模型，网页中（组件中）的数据代言人
```javascript
MVC.model = function() {
  return {
    todoList: [],
    init: function(url) {  // 渲染加载数据
      if(url) { // 使用json，或者数据接口进行数据驱动
        /*
          no time to code
        */
      } else {
        this.todoList.push('First todo')
      }
    },
    setTodo: function(data) {
      this.todoList.push(data)
    },
    deleteTodo: function() {

    }
  }
}()
```

## V——view:   即视图，感觉一眼过去最了解的就是这个？这个是全权代理页面中的显示部分。告诉浏览器，告诉别人内容的初始化（以及视图更新等）
```javascript
MVC.view = function() { // view层主导视图的创建
  var M = MVC.model; // 数据是视图的骨架
  var V = {
    initTodoPanel: function() {
      var todoInput = '<div class="todoInput"><input type="text" id="newTodo" style="width:                         70%;height: 25px;">'+
                      '<button class="btn">add</button></div>' +
                      '<hr><div id="todoBody"></div>'
      var todoFrame = '<div class="todoFrame">' + todoInput + '</div>'
      document.body.innerHTML = todoFrame
      M.init() //初始化数据模型
      this.inserTodo()
    },
    rerenderTodo: function() {
      var todoShow = document.querySelector('#todoBody')
      todoShow.innerHTML = ''
      this.inserTodo()
    },
    inserTodo: function() {
      var todoShow = document.querySelector('#todoBody')
      M.todoList.forEach(function(data) {
        var todo = '<div class="todo">' + data + '</div>'
        todoShow.innerHTML += todo
      })
    }
  }
  return V;
}()
```

## C——controller：  即控制器，页面逻辑的掌控者，就像是网页的中心及大脑，全权调用更新视图以及数据
```javascript
MVC.ctl = function() {
  var V = MVC.view;
  var M = MVC.model;
  var C = {       // 我更偏向于把控制器都暴露出来，这样能使我们对页面的控制更简便，例如我们能动态更新逻辑事件
    start: function() {
      V.initTodoPanel() // 渲染面板
      var $ = function(selector) {
        return document.querySelector(selector)
      };
      $('.btn').addEventListener('click', function() {
        M.setTodo($('#newTodo').value);
        V.rerenderTodo()
      })
    },
    updateView: function() {
      //
    },
    updateModel: function() {
      //
    }
  }
  return C
}()

```

## 为什么要用MVC？
其实我个人认为，这是非常必要的（不管在团队开发中，还是个人项目当中），便于代码的（组件的）复用，业务分离，代码清晰便于将来的维护，修改，甚至重构。开发效率的加快（大部分情况下），同时也能让我们专注于某一个层次的开发，可拓展性也非常强。。。。。。等
