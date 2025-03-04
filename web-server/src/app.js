const express = require("express");
const path = require("path");
const geocode = require("./utills/utills");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.set("../public/index.html", (req, res) => {
  console.log("rendered");
  res.render("index", {
    title: "Home Page",
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
