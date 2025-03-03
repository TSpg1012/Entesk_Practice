const express = require("express");
const path = require("path");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.listen(4000, () => {
  console.log("Server is up on port 4000");
});
