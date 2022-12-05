/**
 * Create routes for Endpoints
 *
 * Endpoints structure
 * - Posting data to Database.
 * - Getting all data from Database.
 * - Getting data based on requested ID.
 * - Updating data based on an ID.
 * - Deleting data based on an ID.
 *
 * @sources https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
 */

const express = require("express");
const router = express.Router();

// 5 REST Methods that use POST, GET, PATCH, and DELETE.
// Router takes the route as first paramenter.
// Then it takes a callback function as the second parameter.
// Callback has res for sending responses to client.
// and, req to receive requests from client.

/** POST Method. */
router.post("/post", (req, res) => {
  res.send("POST API");
});

/** GET all Method. */
router.get("/getAll", (req, res) => {
  res.send("GET All API");
});

/** GET by ID Method. */
router.get("/getOne/:id", (req, res) => {
  res.send("GET by ID API");
});

/** UPDATE by ID Method. */
router.patch("/update/:id", (req, res) => {
  res.send("UPDATE by ID API");
});

/** DELETE by ID Method. */
router.delete("/delete/:id", (req, res) => {
  res.send("DELETE by ID API");
});

module.exports = router;
