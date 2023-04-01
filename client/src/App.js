import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data.todos))
      .catch((err) => console.log(err));
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTodo }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data.todo]);
        setNewTodo('');
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (id) => {
    fetch(`/api/todos/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (id, name) => {
    fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, name };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h1>MERN Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      {todos.map((todo) => (
        <Todo key={todo._id} todo={todo} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
      ))}
    </div>
  );
}

export default App;
