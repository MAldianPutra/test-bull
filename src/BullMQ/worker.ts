import {Worker} from 'bullmq';

export class WorkerBullMQ {
  public async testWorker() {
    console.log('Testing Bull with random data...');
    const userQueue = new Worker(
      'data-queue',
      async job => {
        console.log(job.data);
      }, {
        connection: {
          host: 'redis.develop',
          port: 6379,
        },
        limiter: {
          max: 10,
          duration: 1000,
        }
      });
    userQueue.on('completed', () => {
      console.log('Job completed');
      return;
    });
  }
}

const worker = new WorkerBullMQ();
worker.testWorker();