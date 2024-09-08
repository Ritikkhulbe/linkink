import Redis from "ioredis"

const RedisClient = new Redis(process.env.REDIS_API!);

export default RedisClient;