const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const hbs = require("hbs");

const app = express();

const staticAssetsFolder = path.join(__dirname, "./public");
const viewsFolder = path.join(__dirname, "./templates/views");
const partialsFolder = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsFolder);
hbs.registerPartials(partialsFolder);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(staticAssetsFolder));

app.get("/posts", (req, res, next) => {
  res.render("posts", {
    navText: "Navigation Bar",
  });
});

app.get("/", (req, res, next) => {
  res.render("index", {
    title: "App",
    body: "This is the landing page and the data is being passed through Node.js",
    navText: "Nav Bar",
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
