let todoList = {
    todos: [],
    addTodo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
    },
    changeTodo: function(position, todoText) {
      this.todos[position].todoText = todoText;
    },
    deleteTodo: function(toDelete) {
      this.todos.splice(toDelete ,1);
    },
    toggleCompleted: function(position) {
      debugger;
      this.todos.forEach(function () {    
        if (this.todos.completed === false) {
          let todo = this.todos[position];
          return this.todos.completed = !todo.completed;
        } else  {
          return todo.completed = todo.completed;
        }
      })
    },
    toggleAll: function() {
      let totalTodos = this.todos.length;
      let completedTodos = 0;
      // for (let i = 0; i < totalTodos; i++) {
      //   if (this.todos[i].completed === true) {
      //     completedTodos++;
      //   }
      // }
      this.todos.forEach(function (todos) {
        if (todos.completed === true) {
          completedTodos++;
        };
      });

      // if (completedTodos === totalTodos) {
      //   for (let i = 0; i < totalTodos; i++) {
      //     this.todos[i].completed = false;
      //   }
      // } else {
      //   for (let i = 0; i < totalTodos; i++) {
      //     this.todos[i].completed = true;
      //   }
      // }
      this.todos.forEach(function(todos) {
        if (completedTodos === totalTodos) {
          todos.completed = false;
        } else {
          todos.completed = true;
        }
      });
    }
  };
  
  
  // let displayTodosButton = document.getElementById("displayTodosButton");
  // let toggleAllButton = document.getElementById("toggleAllButton");
  
  // displayTodosButton.addEventListener("click", function() {
  //   todoList.displayTodos();
  // });
  
  // toggleAllButton.addEventListener("click", function() {
  //   todoList.toggleAll();
  // });
  
  // FRONT-END FUNCTIONALITY FOR TODO LIST 
  let handlers = {
    addTodo: function() {
      let addTodoTextInput = document.getElementById("addTodoTextInput");
     
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    },
    changeTodo: function () {
      let changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
      let changeTodoTextInput = document.getElementById("changeTodoTextInput");
      
      todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
      changeTodoPositionInput.value = '';
      changeTodoTextInput.value = '';
      view.displayTodos();
    },
    deleteTodo: function(position) {
      todoList.deleteTodo(position);
      view.displayTodos();

      if (todoList.todos === "") {
        document.write("Your todo list is empty! Congratulations!")
      }
    },
    toggleCompleted: function(position) {
      let toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
      
      todoList.toggleCompleted(position)
      toggleCompletedPositionInput.value = '';
      view.displayTodos();
    },
    toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
    }
  };
  
  let view = {
    displayTodos: function () {
      let todosFrontEndDisplay = document.querySelector("ol");
      todosFrontEndDisplay.innerHTML = "";
      for (let i = 0; i < todoList.todos.length; i++) {
        let todosLi = document.createElement("li");
        let todo = todoList.todos[i];
        let todoTextCompleted = '';
        
        let todoComplete = "(x) ";
        let todoIncomplete = "( ) ";

        todoComplete.innerHTML = 
          '{' +
          'color: black;' +
          '}';
        
        if (todo.completed === true) {
          todoTextCompleted = todoComplete + todo.todoText;
        } else {
          todoTextCompleted = todoIncomplete + todo.todoText;
        }
        
        todosLi.id = i;
        todosLi.textContent = todoTextCompleted;
        todosLi.appendChild(this.createDeleteButton());
        todosFrontEndDisplay.appendChild(todosLi);
      }
    },
    createDeleteButton: function () {
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "deleteButton";
      return deleteButton;
    },
    setUpEventListener: function() {
      let todosOl = document.querySelector("ol");

      todosOl.addEventListener("click", function(click) {
        // Get the element that was clicked on
        let elementClicked = event.target;

        // Check if element clicked is delete button
        if (elementClicked.className === "deleteButton");
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      });
    }
}
  
view.setUpEventListener();
