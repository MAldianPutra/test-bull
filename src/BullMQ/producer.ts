import {Queue} from 'bullmq';

export class ProducerBullMQ {
  public async testAddData() {
    console.log('Add data to queue');
    const userQueue = new Queue('data-queue');
    for (let i = 0; i <= 100; i++) {
      await userQueue.add('data-job', {
        name: `user ${i}`,
        age: `age ${i}`,
      });
    }
    console.log('Add data complete');
  }
}
