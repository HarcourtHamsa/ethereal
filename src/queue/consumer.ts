import { RedisClient, Worker } from "bullmq";
import { IJob } from "../types/job";
import EmailService from "../services/email";
import { EmailProps } from "../types/email";

class QueueConsumer {
  emailService: EmailService;

  constructor(private redisClient: RedisClient) {
    this.processJob = this.processJob.bind(this);
    this.emailService = new EmailService();
  }

  async consumeMessage(queueName: string) {
    const worker = new Worker(queueName, this.processJob, {
      connection: this.redisClient,
      removeOnComplete: { count: 0 },
      concurrency: 5,
    });

    worker.on("completed", (job) => {
      console.log(`${job.id} has completed!`);
    });

    worker.on("failed", (job: any, err) => {
      console.log(`${job.id} has failed with ${err.message}`);
    });

    console.log("Worker started!");
  }

  async processJob(job: IJob) {
    console.log(`Processing job: ${job.name}`);
    console.log(`${job.name} going in`);

    switch (job.name) {
      case "send-welcome-email":
      case "send-admin-welcome-email":
      case "send-forgot-password-email":
      case "send-change-password-email":
      case "send-admin-invite-email":
      case "send-admin-account-creation-email":
      case "send-passcode-reset-email":
      case "send-kyc-approval-email":
      case "send-kyc-rejection-email":
        console.log("processing email job");

        await this.emailService.sendEmail({
          type: job.name,
          data: job.data as EmailProps,
        });
        break;

      default:
        break;
    }
  }
}

export default QueueConsumer;
