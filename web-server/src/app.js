const express = require("express");
const path = require("path");
const geocode = require("./utills/utills");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../public/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Said",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Said",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Said",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must have a address term",
    });
  }

  geocode(req.query.address, (error, location) => {
    if (error) {
      return res.send({ error: error });
    }

    return res.send({
      location,
      address: req.query.address,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.listen(5000, () => {
  console.log("Server is up on port 5000");
});
