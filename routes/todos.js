const express = require('express');
const router = express.Router();
const models = require('../models');
const helpers = require('../helpers/todos');

router.route('/')
  .get(helpers.getAllTodos)
  .post(helpers.postTodo);

router.route('/:todoId')
  .get(helpers.getTodoById)
  .put(helpers.putTodo)
  .delete(helpers.deleteTodo);

module.exports = router;