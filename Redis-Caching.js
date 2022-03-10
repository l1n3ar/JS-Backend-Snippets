const axios = require('axios');
const redis = require('redis');
const express = require('express');
const responseTime = require('response-time');

const app = express();
app.use(responseTime());

const client = redis.createClient();
client.on('error', (error) => console.log(error));
const cachingServer = async () => {
  await client.connect();
};
cachingServer();

const getRockets = async (req, res, next) => {
  const doesExist = await client.get('Rockets');
  if (doesExist) {
    const rockets = await client.get('Rockets');
    res.send(JSON.parse(rockets));
  } else {
    const response = await axios.get('https://api.spacexdata.com/v3/rockets');
    const data = await response.data;
    await client.set('Rockets', JSON.stringify(data));
    res.send(data);
  }
};

const getCapsules = async (req, res, next) => {
  const doesExist = await client.get('Capsules');
  if (doesExist) {
    const capsules = await client.get('Capsules');
    res.send(JSON.parse(capsules));
  } else {
    const response = await axios.get('https://api.spacexdata.com/v3/capsules');
    const data = await response.data;
    await client.set('Capsules', JSON.stringify(data));
    res.send(data);
  }
};

app.get('/capsules', getCapsules);
app.get('/rockets', getRockets);
app.get('/', (req, res, next) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});


//After caching response time went from 1269.865 to 0.956 ms
