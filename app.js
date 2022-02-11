const express = require("express");
const http = require("http");
const app = express();
app.use((req, res, next) => {
  console.log("Middleware1");
  next();
});
app.use((req, res, next) => {
  console.log("Middleware");
  res.send();
});

http.createServer(app).listen(3000);
