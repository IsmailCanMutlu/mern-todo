import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((prevState) => prevState.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="my-4">Todo List</h2>
      <ul className="list-group">
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
