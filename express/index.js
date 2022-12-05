// Entry point for application.
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

/** @sources https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/ */
const app = express();

app.use(cors());
app.use(express.json());

/** @route "/" */
app.get("/", (req, res) => {
  res.send({
    message: "Entrypoint for application",
    route: "/",
    port: PORT,
  });
});

/** @route "/api/" */
app.get("/api", (req, res) => {
  res.send({
    message: "API endpoints",
    route: "/api",
    port: PORT,
    endpoints: [
      {
        route: "/api/todos",
        method: "GET",
        description: "Get all todos",
        example: "/api/todos",
      },
      {
        route: "/api/todos/:id",
        method: "GET",
        example: "/api/todos/0",
        description: "Get todo by id",
      },
      {
        route: "/api/todos/:id/update",
        method: "PATCH",
        example: "/api/todos/0/update",
        description: "Update todo by id",
      },
      {
        route: "/api/todos/:id/delete",
        method: "DELETE",
        example: "/api/todos/0/delete",
        description: "Delete todo by id",
      },
      {
        route: "/api/todos/create",
        method: "POST",
        example: "/api/todos/create",
        description: "Create new todo",
      },
      {
        route: "/api/todos/:id/completed",
        method: "PATCH",
        example: "/api/todos/0/completed",
        description: "Update todo completed status",
      },
      {
        route: "/api/todos/:id/uncompleted",
        method: "PATCH",
        example: "/api/todos/0/uncompleted",
        description: "Update todo as not complete status",
      },
    ],
  });
});

const todosInitialValues = [
  {
    id: 0,
    userId: 0,
    title: "Test 1",
    body: "Body test 1",
    completed: false,
  },
];

/** @route "/api/todos" */
app.get("/api/todos", (req, res) => {
  res.json(todosInitialValues);
});

/** @port http:localhost:8080/ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
