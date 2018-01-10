/* global $ */
$(document).ready(function(){
  $.getJSON('/api/todos')
  .then(function(todos){
    addTodos(todos);
  })
  .catch(function(err){
    console.log(err);  
  });
});

function addTodos(todos){
  const todo_list = $('ul.list');
  todos.forEach( todo => {
    const todoElem = $(`<li class="task">${todo.name}</li>`);
    todoElem.addClass('task');
    if (todo.completed){
      todoElem.addClass('done');
    }
    todo_list.append(todoElem)
  })
}