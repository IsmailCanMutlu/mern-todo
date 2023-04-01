const Todo = require('../models/todoModel');

const getAllTodos = async () => {
  return await Todo.find();
};

const getTodoById = async id => {
  return await Todo.findById(id);
};

const createTodo = async todo => {
  const newTodo = new Todo({
    title: todo.title,
    description: todo.description,
    completed: false
  });
  return await newTodo.save();
};

const updateTodo = async (id, todo) => {
  return await Todo.findByIdAndUpdate(id, todo, { new: true });
};

const deleteTodo = async id => {
  return await Todo.findByIdAndDelete(id);
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
