/** Model defines the data structure of the database */

const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

/** Export model Data to routes.js/ts. */
module.exports = mongoose.model("Data", dataSchema);
