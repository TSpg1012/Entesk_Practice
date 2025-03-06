const mongoose = require("mongoose");

const model = mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  {
    collection: "users",
  }
);

const Users = mongoose.model("users", model);

module.exports = Users;
