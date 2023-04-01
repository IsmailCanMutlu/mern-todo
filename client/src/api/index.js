const BASE_URL = 'http://localhost:5000';

export const getAllTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  const data = await response.json();
  return data;
};

export const addTodo = async (todo) => {
  const response = await fetch(`${BASE_URL}/todos/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
};

export const updateTodo = async (id, todo) => {
  const response = await fetch(`${BASE_URL}/todos/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/delete/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};
