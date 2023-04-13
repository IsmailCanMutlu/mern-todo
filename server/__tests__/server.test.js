const request = require('supertest');
const express = require('express');
const todoRoutes = require('../routes/todoRoutes');
const Todo = require('../models/todoModel');
const app = express();

app.use(express.json());
app.use('/api/todos', todoRoutes);

beforeEach(async () => {
  await Todo.deleteMany({});
});

afterEach(async () => {
  await Todo.deleteMany({});
});

describe('Todo API', () => {
  let createdTodoId;

  test('Create todo with empty name', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ name: '', description: 'Test description', completed: false });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  }, 10000);

  test('Create todo with empty description', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ name: 'Test name', description: '', completed: false });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  }, 10000);

  test('Create todo successfully', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ name: 'Test name', description: 'Test description', completed: false });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    createdTodoId = response.body._id;
  }, 10000);

  test('Get all todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  }, 10000);

  test('Get specific todo', async () => {
    const response = await request(app).get(`/api/todos/${createdTodoId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', createdTodoId);
  }, 10000);

  test('Update todo with empty name', async () => {
    const response = await request(app)
      .put(`/api/todos/${createdTodoId}`)
      .send({ name: '', description: 'Updated description', completed: true });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  }, 10000);

  test('Update todo with empty description', async () => {
    const response = await request(app)
      .put(`/api/todos/${createdTodoId}`)
      .send({ name: 'Updated name', description: '', completed: true });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  }, 10000);

  test('Update todo successfully', async () => {
    const response = await request(app)
      .put(`/api/todos/${createdTodoId}`)
      .send({ name: 'Updated name', description: 'Updated description', completed: true });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', createdTodoId);
  }, 10000);

  test('Delete todo successfully', async () => {
    const response = await request(app).delete(`/api/todos/${createdTodoId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('msg', 'Todo removed');
  }, 10000);

  test('Check if deleted todo still exists', async () => {
    const response = await request(app).get(`/api/todos/${createdTodoId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('msg', 'Todo not found');
  }, 10000);
});

