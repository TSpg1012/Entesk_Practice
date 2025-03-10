const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Age must be at least 18"],
    },
    id: {
      type: Number,
      required: [true, "ID is required"],
      unique: true,
    },
  },
  {
    collection: "users",
  }
);

const Users = mongoose.model("users", userSchema);

module.exports = Users;
