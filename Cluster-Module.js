//clustering
//ab for benchmarking, loaded in Mac
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');
const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 5000;

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  app.get('/', (req, res, next) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hello, World!');
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
  });
}
