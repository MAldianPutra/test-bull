import Bull from 'bull';

export class ProducerBull {
  public async testAddData() {
    console.log('Add data to queue');
    const userQueue = new Bull('data-queue', {
      redis: {
        host: 'redis.develop',
        port: 6379,
      },
      limiter: {
        max: 100,
        duration: 1000,
      },
    });
    for (let i = 0; i <= 100; i++) {
      await userQueue.add({
        name: `user ${i}`,
        age: `age ${i}`,
      });
    }
    console.log('Add data complete');
  }
}

const producer = new ProducerBull();
producer.testAddData();
