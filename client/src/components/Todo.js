import React, { useState } from "react";


const Todo = (props) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [completed, setCompleted] = useState(props.completed);

  const handleCompletedChange = () => {
    fetch(`http://localhost:5000/api/todos/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((response) => response.json())
      .then(() => {
        setCompleted(!completed);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/todos/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, description: description }),
    })
      .then((response) => response.json())
      .then(() => {
        props.setTodos((prevState) =>
          prevState.map((todo) => {
            if (todo._id === props.id) {
              return { ...todo, title: title, description: description };
            } else {
              return todo;
            }
          })
        );
        setEditable(false);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/todos/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        props.setTodos((prevState) =>
          prevState.filter((todo) => todo._id !== props.id)
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="todo">
      <div className="todo-header">
        {editable ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h3>{title}</h3>
        )}
        <div>
          <button onClick={() => setEditable(!editable)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <p>
        {editable ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        ) : (
          description
        )}
      </p>
      <div>
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChange}
          />
        </label>
      </div>
      {editable && <button onClick={handleUpdate}>Save</button>}
    </div>
  );
};

export default Todo;
