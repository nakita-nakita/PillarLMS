import { RedisClientType } from '@redis/client';
import { createClient } from 'redis'

const initServer = async (client) => {

  client.on('error', err => console.log('Redis Client Error', err));

  await client.connect();

  return client
}

let redisClient = createClient()

initServer(redisClient).then(client => {
  redisClient = client
})

export default redisClient