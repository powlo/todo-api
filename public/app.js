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
  
  //handle delete
  $('.list').on('click', 'span', function(){
    const todoElem = $(this).parent();
    deleteTodo(todoElem);
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
    const todoElem = $(`<li class="task">${todo.name}<span>X</span></li>`);
    todoElem.addClass('task');
    
    //use jQuery data store.
    todoElem.data('id', todo._id);
    if (todo.completed){
      todoElem.addClass('done');
    }
    $('ul.list').append(todoElem);
}

function deleteTodo(todoElem){

    const id = todoElem.data('id');

    $.ajax(`/api/todos/${id}`, {method: 'DELETE'})
    .then(function(){
      todoElem.remove();
    })
    .catch(function(err){
      console.log(err);
    });
}