// /* eslint-disable */
import Bull from 'bull';

console.log('Running...');

const users = [
  {name: 'John', age: 31},
  {name: 'Jane', age: 25},
  {name: 'Jim', age: 19},
  {name: 'Jill', age: 17},
  {name: 'Jack', age: 32},
];

export class TestBull {
  public async testUser() {
    console.log('Testing Bull with user data...');
    const userQueue = new Bull('user-queue', {
      redis: {
        host: 'redis.develop',
        port: 6379,
      },
      limiter: {
        max: 1,
        duration: 1000,
        groupKey: 'user',
      },
    });

    console.log('Add user to queue');
    users.forEach(async user => {
      await userQueue.add({
        name: user.name,
        age: user.age,
      });
    });

    userQueue.process(async job => {
      console.log(job.data);
    });

    userQueue.on('completed', (job, result) => {
      console.log(`Job completed with result ${result}`);
      return;
    });
  }

  public async testRandomDataA() {
    console.log('Testing Bull with random data...');
    const userQueue = new Bull('data-queue', {
      redis: {
        host: 'redis.develop',
        port: 6379,
      },
      limiter: {
        max: 1,
        duration: 1000,
      },
    });

    console.log('Add data to queue');
    for (let i = 0; i <= 10; i++) {
      await userQueue.add({
        name: `user ${i} - a`,
        age: `age ${i} - a`,
      });
    }
    userQueue.process(async job => {
      console.log(job.data);
    });

    userQueue.on('completed', (job, result) => {
      console.log(`Job completed with result ${result}`);
      return;
    });
  }

  public async testRandomDataB() {
    console.log('Testing Bull with random data...');
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

    console.log('Add data to queue');
    for (let i = 0; i <= 10; i++) {
      await userQueue.add({
        name: `user ${i} - b`,
        age: `age ${i} - b`,
      });
    }
    userQueue.process(async job => {
      console.log(job.data);
    });

    userQueue.on('completed', (job, result) => {
      console.log(`Job completed with result ${result}`);
      return;
    });
  }
}

const testBull = new TestBull();
testBull.testUser();
testBull.testRandomDataA();
testBull.testRandomDataB();
