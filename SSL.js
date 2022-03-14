const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const https = require('https');
require('dotenv').config();

const app = express();

app.get('/secret', (req, res, next) => {
  res.send('Hello');
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo DB Connected');
    https
      .createServer(
        {
          key: fs.readFileSync('key.pem'),
          cert: fs.readFileSync('cert.pem'),
        },
        app
      )
      .listen(process.env.PORT, () => {
        console.log(`Server started on port : ${process.env.PORT}`);
      });
  })
  .catch((error) => console.log(error));
