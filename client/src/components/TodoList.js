import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setNewTodo({
      ...newTodo,
      [name]: inputValue,
    });
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo({
          title: "",
          description: "",
          completed: false,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((prevState) => prevState.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (id, updatedTodo) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((prevState) =>
          prevState.map((todo) => {
            if (todo._id === id) {
              return {
                ...todo,
                title: updatedTodo.title,
                description: updatedTodo.description,
                completed: updatedTodo.completed,
              };
            }
            return todo;
          })
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-4">
      <h1>MERN Todo List</h1>
      <div className="row">
        <form onSubmit={handleAddTodo}>
          <div className="col">
            <input
              type="text"
              className="form-control mb-2"
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
              placeholder="Add todo..."
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control mb-2"
              name="description"
              value={newTodo.description}
              onChange={handleInputChange}
              placeholder="Add description..."
            />
          </div>
          <div className="col">
            <button className="btn btn-primary mb-2" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;




