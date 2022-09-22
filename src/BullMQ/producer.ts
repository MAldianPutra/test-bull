import {Queue} from 'bullmq';

export class ProducerBullMQ {
  public async testAddData() {
    console.log('Add data to queue');
    const userQueue = new Queue('data-queue', {connection: {      
      host: 'redis.develop',
      port: 6379,
    }})
    for (let i = 0; i <= 100; i++) {
      await userQueue.add('data-job', {
        name: `user ${i}`,
        age: `age ${i}`,
        from: 'Bull MQ'
      });
    }
    console.log('Add data complete');
  }
}

const producer = new ProducerBullMQ();
producer.testAddData();
