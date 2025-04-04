import { Queue, RedisClient } from "bullmq";
import { IJob } from "../types/job";
import { DEFAULT_REDIS_QUEUE } from "../constants";

class QueueProducer {
  queue: any;

  constructor(
    private redisClient: RedisClient,
    queueName?: string
  ) {
    if (queueName) {
      this.creatQueue(DEFAULT_REDIS_QUEUE);
    }
  }

  async creatQueue(queueName: string) {
    return (this.queue = new Queue(queueName, {
      connection: this.redisClient,
    }));
  }

  async addJob(job: IJob) {
    if (!this.queue) {
      throw new Error("Queue not initialized");
    }

    console.log("Adding job to queue", job.name);

    this.queue.add(job.name, job.data);
    return true;
  }

  get mq() {
    return this.queue;
  }
}

export default QueueProducer;
