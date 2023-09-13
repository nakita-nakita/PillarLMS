import * as redis from 'redis';

const connectToRedis = (): ReturnType<typeof redis.createClient> => {
  // Create a client and connect to default Redis port 6379 on localhost
  const client = redis.createClient({
    // host: 'localhost',    // Replace with your Redis server's address if different
    // port: 6379            // Replace with your Redis server's port if different
  });

  // Handle connection errors
  client.on('error', (err: Error) => {
    console.error('Error connecting to Redis:', err);
  });

  // Once connected, log to the console
  client.on('connect', () => {
    console.log('Connected to Redis successfully!');
  });

  return client;
}

export default connectToRedis;

// import { RedisClientType } from '@redis/client';
// import { createClient } from 'redis'

// const initServer = async (client) => {

//   client.on('error', err => console.log('Redis Client Error', err));

//   await client.connect();

//   return client
// }

// let redisClient = createClient()

// initServer(redisClient).then(client => {
//   redisClient = client
// })

// export default redisClient