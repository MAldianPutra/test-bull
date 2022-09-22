import {Worker} from 'bullmq';

export class WorkerBullMQ {
  public async testWorker() {
    console.log('Testing Bull with random data...');
    const userQueue = new Worker(
      'data-queue',
      async job => {
        console.log(job);
      },
      {
        connection: {
          host: 'redis.develop',
          port: 6379,
        },
      }
    );
    userQueue.on('completed', () => {
      console.log('Job completed');
      return;
    });
  }
}

const worker = new WorkerBullMQ();
worker.testWorker();
