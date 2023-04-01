import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Todo = ({ todo, handleDelete }) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleEdit = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEditable(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {editable ? (
        <Form.Group className="mb-0 me-3">
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
      ) : (
        <div>{todo.title}</div>
      )}
      <div>
        <button
          className="btn btn-secondary me-2"
          onClick={() => setEditable(!editable)}
        >
          {editable ? "Cancel" : "Edit"}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(todo._id)}
        >
          Delete
        </button>
        {editable && (
          <button
            className="btn btn-success ms-2"
            onClick={() => handleEdit(todo._id)}
          >
            Save
          </button>
        )}
      </div>
    </li>
  );
};

export default Todo;
