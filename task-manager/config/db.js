const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("Error: " + error);
  });
