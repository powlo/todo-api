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
  
  $('.list').on('click', 'li', function(){
    updateTodo($(this));
  });
  
  //handle delete
  $('.list').on('click', 'span', function(e){
    //stop the event from bubbling up to li
    e.stopPropagation();
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
    todoElem.data('completed', todo.completed);
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

function updateTodo(todoElem){
  const id = todoElem.data('id');
  const completed = todoElem.data('completed');
  $.ajax(`/api/todos/${id}`, {method: 'PUT', data: {completed: !completed }})
  .then(function(){
    todoElem.toggleClass('done');
    todoElem.data('completed', !completed);
  })
  .catch()
}