const todoService = require('../services/todoService');

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Server Error');
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Failed to create todo');
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Todo could not be updated');
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
