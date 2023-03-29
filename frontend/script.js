const addTodoBtn = document.getElementById("addTodoBtn");

async function fetchTodos() {
  const todoList = document.getElementById("todos");
  todoList.innerHTML = "";

  await fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((todos) => {
      renderTodos(todos, todoList);
    });
}

function renderTodos(todos, todoList) {
  todos.forEach((todo) => {
    const todoWrapper = document.createElement("div");
    todoWrapper.setAttribute("class", "todoWrapper");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.setAttribute("type", "checkbox");
    if (todo.completed) {
      todoCheckbox.setAttribute("checked", "checked");
    } else {
      todoCheckbox.setAttribute("unchecked", "unchecked");
    }
    todoCheckbox.setAttribute("id", todo.id);

    const todoItem = document.createElement("p");
    todoItem.innerText = todo.task;
    todoItem.setAttribute("id", todo.id);
    todoItem.setAttribute("class", "todoTask");

    const todoDelete = document.createElement("button");
    todoDelete.innerText = "Delete";
    todoDelete.setAttribute("id", todo.id);
    todoDelete.setAttribute("class", "todoDelete");

    todoList.appendChild(todoWrapper);
    todoWrapper.appendChild(todoCheckbox);
    todoWrapper.appendChild(todoItem);
    todoWrapper.appendChild(todoDelete);
  });
  addEventListeners();
}

function addEventListeners() {
  const todoTasks = document.querySelectorAll(".todoDelete");
  todoTasks.forEach((todoTask) => {
    todoTask.addEventListener("click", (e) => {
      deleteTodo(e.target);
    });
  });

  const todoCheckboxes = document.querySelectorAll("input[type=checkbox]");
  todoCheckboxes.forEach((todoCheckbox) => {
    todoCheckbox.addEventListener("click", (e) => {
      toggleComplete(e.target);
    });
  });
}

function addTodo() {
  const todoInput = document.querySelector("#todoInputText");
  const task = todoInput.value;
  const newTodo = {
    task: task,
    completed: false,
  };

  fetch("http://localhost:3000/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then(() => {
      todoInput.value = "";
      fetchTodos();
    });
}

function deleteTodo(target) {
  const todoId = target.id;

  fetch(`http://localhost:3000/todos/delete/${todoId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      fetchTodos();
    });
}

function toggleComplete(target) {
  const todoId = target.id;
  const completed = target.checked;

  fetch(`http://localhost:3000/todos/update/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: completed }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchTodos();
    });
}

fetchTodos();
addTodoBtn.addEventListener("click", addTodo);
