import "dotenv/config";
import "./config/database";
import { runSeed } from "./auto/seed";
import { app } from "./app";
import QueueConsumer from "./queue/consumer";
import redisConnection from "./config/redis";
import { DEFAULT_REDIS_QUEUE } from "./constants";

const PORT = process.env.PORT || 80;

const queueConsumer = new QueueConsumer(redisConnection);

runSeed();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

queueConsumer.consumeMessage(DEFAULT_REDIS_QUEUE);
