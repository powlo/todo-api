const models = require('../models');

exports.getAllTodos = function(req, res){
    models.Todo.find()
    .then(function(todos){
        res.send(todos);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.getTodoById = function(req, res){
  models.Todo.findById(req.params.todoId)
  .then(function(todo){
    res.json(todo);
  })
  .catch(function(err){
    res.send(err);
  });
};

exports.postTodo = function(req, res){
  models.Todo.create(req.body)
  .then(function(todo){
    res.status(201).json(todo);
  })
  .catch(function(err){
    res.send(err);
  });
};

exports.putTodo = function(req, res){
  models.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
  .then(function(todo){
    res.json(todo);
  })
  .catch(function(err){
    res.send(err);
  });
};

exports.deleteTodo = function(req, res){
  models.Todo.remove({_id: req.params.todoId})
  .then(function(){
    res.json({message: "Deleted."});
  })
  .catch(function(err){
    res.send(err);
  });
};