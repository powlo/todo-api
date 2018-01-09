const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res){
    models.Todo.find()
    .then(function(todos){
        res.send(todos);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.post('/', function(req, res){
  models.Todo.create(req.body)
  .then(function(todo){
    res.status(201).json(todo);
  })
  .catch(function(err){
    res.send(err);
  });
});

module.exports = router;