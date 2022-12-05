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
    message: "API running",
    route: "/api",
    port: PORT,
  });
});

/** @port http:localhost:8080/ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
