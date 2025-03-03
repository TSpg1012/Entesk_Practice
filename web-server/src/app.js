const express = require("express");
const path = require("path");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.set("view cache", false);

app.use(express.static(publicDirectoryPath));

app.set("../views/index.hbs", (req, res) => {
  console.log("rendered");
  res.render("index", {
    title: "Home Page",
    name: "Said",
  });
});

app.listen(5000, () => {
  console.log("Server is up on port 5000");
});
