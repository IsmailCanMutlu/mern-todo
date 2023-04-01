const request = require('supertest');
const app = require('../server');

describe('Todo API', () => {
  let todoId = '';

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test Todo', completed: false });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('Test Todo');
    expect(res.body.completed).toEqual(false);
    todoId = res.body._id;
  });

  it('should update an existing todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ title: 'Updated Todo', completed: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Todo');
    expect(res.body.completed).toEqual(true);

    const updatedTodo = await request(app).get(`/api/todos/${todoId}`);
    expect(updatedTodo.statusCode).toEqual(200);
    expect(updatedTodo.body.title).toEqual('Updated Todo');
    expect(updatedTodo.body.completed).toEqual(true);
  });


  it('should delete an existing todo', async () => {
    const res = await request(app)
      .delete(`/api/todos/${todoId}`);
    expect(res.statusCode).toEqual(204);

    const deletedTodo = await request(app).get(`/api/todos/${todoId}`);
    expect(deletedTodo.statusCode).toEqual(404);
  });
});
