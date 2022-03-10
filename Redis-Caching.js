const redis = require('redis');
const client = redis.createClient();
client.on('error', (error) => console.log(error));

const cachingServer = async () => {
  await client.connect();
  await client.set('hi', 'there');
  const value = await client.get('hi');
  console.log(value);
};

cachingServer();
