// Entry point for application.
const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

/** @sources https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/ */
const app = express();

app.use(express.json());

/** @route "/" */
app.get("/", (req, res) => {
  res.send({
    message: "Entrypoint for application",
    route: "/",
    port: port,
  });
});

/** @route "/api/" */
app.get("/api", (req, res) => {
  res.send({
    message: "API running",
    route: "/api",
    port: port,
  });
});

/** @port http:localhost:8080/ */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
