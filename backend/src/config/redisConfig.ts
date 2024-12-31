import { logError } from '@/utils/logger_utils';
import {createClient} from 'redis'

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  const connectRedis = async () => {
    try {
      await redisClient.connect();
    } catch (error) {
      logError(error);
    }
  };  

redisClient.on('error', err => logError(err));
redisClient.on('connect', () => console.log('Redis connected'));

export { redisClient, connectRedis };
