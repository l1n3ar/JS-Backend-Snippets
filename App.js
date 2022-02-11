const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action = "/product" method = "POST"><input type="text" name="title"><button>Enter</button></form> '
  );
});

app.post("/product", (req, res, next) => {
  //Triggers only for post requests.
  console.log(req.body.title);
  res.redirect("/add-product");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Welcome to my express server</h1>");
});

http.createServer(app).listen(3000);
