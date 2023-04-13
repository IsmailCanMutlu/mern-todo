import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';

import { TodoApi } from '../api/todoApi';
import '../App.css';

export const TodoComponent = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });
  const [editTodo, setEditTodo] = useState({ id: null, title: '', description: '', completed: false });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const { data, error } = await TodoApi.gets();
    if (error) {
      console.error(error);
    }
    setTodoList(data);
  }

  async function addTodo() {
    if (!newTodo.title) {
      alert('Title cannot be empty');
      return;
    }
    if (!newTodo.description) {
      alert('Description cannot be empty');
      return;
    }
  
    const { error } = await TodoApi.create(newTodo);
    if (error) {
      console.error(error);
    } else {
      setNewTodo({ title: '', description: '', completed: false });
      getTodos();
    }
  }
  

  async function updateTodo() {
    if (!editTodo.title) {
      alert('Title cannot be empty');
      return;
    }
    if (!editTodo.description) {
      alert('Description cannot be empty');
      return;
    }
  
    const { error } = await TodoApi.update(editTodo.id, editTodo);
    if (error) {
      console.error(error);
    } else {
      setShowEditModal(false);
      getTodos();
    }
  }
  

  async function deleteTodo(id) {
    const { error } = await TodoApi.delete(id);
    if (error) {
      console.error(error);
    } else {
      getTodos();
    }
  }

  function openEditModal(item) {
    const { _id, title, description, completed } = item;
    setEditTodo({ id: _id, title, description, completed });
    setShowEditModal(true);
  }
  

  function closeEditModal() {
    setShowEditModal(false);
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <h2>Todo Input</h2>
          </Col>
        </Row>
        <Row className="add-todo-form">
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              id="completed"
              label={newTodo.completed ? 'Completed' : 'Not Completed'}
              checked={newTodo.completed}
              onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={addTodo}>
              Add Todo
            </Button>
          </Col>
        </Row>
      </Container>
      <br />
      <Container>
        <Row>
          <Col>
            <h2>Todo List</h2>
          </Col>
        </Row>
        {todoList.map((todo, index) => (
          <Row key={index} className="todo-item">
            <Col>
              <h5>{todo.title}</h5>
              <p>{todo.description}</p>
            </Col>
            <Col xs="auto" className="todo-status">
              {todo.completed ? (
                <FaCheckCircle size="1.5em" color="green" />
              ) : (
                <FaTimesCircle size="1.5em" color="red" />
              )}
            </Col>
            <Col xs="auto" className="todo-actions">
              <button className="btn btn-edit" onClick={() => openEditModal(todo)}>
                <FaEdit />
              </button>
              <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>
                <FaTrash />
              </button>
            </Col>
          </Row>
        ))}

        <Modal show={showEditModal} onHide={closeEditModal} className="edit-todo-modal">
          <Modal.Header >
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={editTodo.title}
                  onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={editTodo.description}
                  onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  id="completedEdit"
                  label={editTodo.completed ? 'Completed' : 'Not Completed'}
                  checked={editTodo.completed}
                  onChange={(e) => setEditTodo({ ...editTodo, completed: e.target.checked })}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={updateTodo}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </React.Fragment>
  );
};

export default TodoComponent;