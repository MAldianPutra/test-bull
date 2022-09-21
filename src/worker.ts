import Bull from 'bull';

export class WorkerBull {
  public async testWorker() {
    console.log('Testing Bull with random data...');
    const userQueue = new Bull('data-queue', {
      redis: {
        host: 'redis.develop',
        port: 6379,
      },
      limiter: {
        max: 100,
        duration: 1000,
        bounceBack: false,
      },
    });
    userQueue.process(async job => {
      console.log(job.data);
    });
    userQueue.on('completed', () => {
      console.log('Job completed');
      return;
    });
  }
}

const worker = new WorkerBull();
worker.testWorker();
