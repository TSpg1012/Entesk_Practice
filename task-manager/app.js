const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router/router");
const port = 3000;

require("dotenv").config();
require("./config/db");

app.use(bodyParser.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
