const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router/router");
const port = 3000;
const jwt = require("jsonwebtoken");

require("dotenv").config();
require("./config/db");

// app.use((req, res, next) => {
//   res.status(503).send("Backend is currently down");
// }); disabled all requests

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "password", {
//     expiresIn: "1 seconds",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "password");
//   console.log(data);
// };

// myFunction();
