const express = require('express');
const crypto = require('crypto');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hello, World!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//pm2 start server.js -i 0
//pm2 list
//pm2 show <Your Server Name which you will get from show>
//pm2 monit
//pm2 delete server
