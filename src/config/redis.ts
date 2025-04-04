import IORedis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const REDIS_URL = process.env.REDIS_URL as string;

export const redisConnection = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("Connected to Redis");
});

redisConnection.on("close", () => {
  console.log("Redis connection closed");
});

export default redisConnection;
