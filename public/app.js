/* global $ */
$(document).ready(() => {
  //List all the todos
  $.getJSON('/api/todos')
  .then(todos => {
    addTodos(todos);
  })
  .catch(function(err){
    console.log(err);  
  });
  
  //Create todo
  $('#todoInput').keypress(function(event) {
    if (event.which === 13) {
      createTodo();
    }
  });
});

function addTodos(todos){
  todos.forEach( todo => {
    addTodo(todo);
  });
}

function createTodo(){
  const name = $('#todoInput').val();
  $.post('api/todos', { name })
  .then(function(todo){
    $('#todoInput').val('');
    if (!todo.errors){
      addTodo(todo);
    }
  });
}

function addTodo(todo){
    const todoElem = $(`<li class="task">${todo.name}</li>`);
    todoElem.addClass('task');
    if (todo.completed){
      todoElem.addClass('done');
    }
    $('ul.list').append(todoElem);
}