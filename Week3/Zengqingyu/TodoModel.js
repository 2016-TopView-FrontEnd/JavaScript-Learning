TodoModel = {

  todoList: [],
  leftNum: 0,
  newId: 0,
  initData: function() {
    var localData = localStorage.getItem('todoData');
    if (localData) {
      this.todoList = JSON.parse(localData);
    }
    this.newId = localStorage.getItem('idStorage') ? parseInt(localStorage.getItem('idStorage')) : 0;
    this.refreshLeftNum();
  },
  getLocalId: function() {
    this.newId = localStorage.getItem('idStorage') ? parseInt(localStorage.getItem('idStorage')) : 0;
  },
  saveLocalData: function() {
    localStorage.setItem('todoData', JSON.stringify(this.todoList));
    localStorage.setItem('idStorage', this.newId);
  },
  refreshLeftNum: function() {
    this.leftNum = 0;
    for (var i = 0; i < this.todoList.length; i++) {
      if (!this.todoList[i].complete) {
        this.leftNum++;
      }
    }
  },
  getAnTodoId: function() {
    return this.newId++;
  },
  addTodo: function(todo) {
    this.todoList.push(todo);
    this.leftNum++;
  },
  removeTodo: function(todo) {
    var removeIndex = -1;
    for (var i = 0, len = this.todoList.length; i < len; i++) {
      if (this.todoList[i].id == todo.id) {
        removeIndex = i;
        break;
      }
    }
    if (removeIndex != -1) {
      if (!this.todoList[removeIndex].complete) {
        this.leftNum++;
      }
      this.todoList.splice(removeIndex, 1);
    }
  },
  removeTodoById: function(todoId) {
    var removeIndex = -1;
    for (var i = 0, len = this.todoList.length; i < len; i++) {
      if (this.todoList[i].id == todoId) {
        removeIndex = i;
        break;
      }
    }
    if (removeIndex != -1) {
      if (!this.todoList[removeIndex].complete) {
        this.leftNum--;
      }
      this.todoList.splice(removeIndex, 1);
    }
  },
  removeAll: function() {
    this.todoList = [];
    this.leftNum = 0;
    this.newId = 0;
  },
  removeDoneOrUndo: function(isDone) {
    // var todoList = this.todoList;
    this.todoList = this.todoList.filter(function(item) {
      return (item.complete != isDone);
    });
    if (isDone) {
      this.leftNum = this.todoList.length;
    } else {
      this.leftNum = 0;
    }
  },
  setTodoDone: function(todo) {
    // var todoList = this.todoList;
    for (var i = 0, len = this.todoList.length; i < len; i++) {
      if (this.todoList[i].id == todo.id) {
        this.todoList[i].complete = !this.todoList[i].complete;
        break;
      }
    }
  },
  setTodoDoneById: function(todoId) {
    var todoList = this.todoList;
    for (var i = 0, len = todoList.length; i < len; i++) {
      if (todoList[i].id == todoId) {
        todoList[i].complete = !todoList[i].complete;
        if (todoList[i].complete) {
          this.leftNum--;
        } else {
          this.leftNum++;
        }
        break;
      }
    }
  },
  modifTodo: function(todoId, value) {
    for (var i = 0, len = this.todoList.length; i < len; i++) {
      if (this.todoList[i].id == todoId) {
        this.todoList[i].value = value;
      }
    }
  },
  setAllTodo: function(isDone) {
    this.todoList.forEach(function(item) {
      item.complete = isDone;
    });
    this.leftNum = isDone ? 0 : this.todoList.length;
  }
}
