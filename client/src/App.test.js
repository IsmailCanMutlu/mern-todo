test("DELETE /api/todos/:id endpoint should delete the specified todo from the list", async () => {
    // Add a new todo item to the list
    const newTodo = {
      title: "Test Todo",
      completed: false,
    };
    const response = await request(app).post("/api/todos").send(newTodo);
    expect(response.statusCode).toBe(201);
  
    // Get the list of todos to obtain the ID of the newly added item
    const getResponse = await request(app).get("/api/todos");
    expect(getResponse.statusCode).toBe(200);
    const todoList = getResponse.body;
    const addedTodo = todoList.find((todo) => todo.title === newTodo.title);
  
    // Delete the newly added todo item
    const deleteResponse = await request(app).delete(
      `/api/todos/${addedTodo._id}`
    );
    expect(deleteResponse.statusCode).toBe(204);
  
    // Make sure that the todo item has been removed from the list
    const updatedResponse = await request(app).get("/api/todos");
    expect(updatedResponse.statusCode).toBe(200);
    const updatedTodoList = updatedResponse.body;
    const foundTodo = updatedTodoList.find((todo) => todo.title === newTodo.title);
    expect(foundTodo).toBeUndefined();
  });
  