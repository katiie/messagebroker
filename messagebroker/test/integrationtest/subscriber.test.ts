import {DatabaseService} from '../../src/datacontext/database.service'
import { expect, describe, beforeAll, afterAll,it } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Subscriber } from '../../src/brokerservices/subscriber';

const databaseService = new DatabaseService();
const subscriber = new Subscriber();

describe('subscriber', () => {

  beforeAll(async () => {

    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await databaseService.connectToDatabase(uri,'test');
  });

  afterAll(async () => {
    await databaseService.destroyclient();
  });

  it('subscribe to topic and return empty value', async () => { 
    const data =await subscriber.subscribe('testCollection');
    expect(data).toBeFalsy();
  });
 
  it('subscribe to topic and return value', async () => { 
  
    const topicname = 'registration';
    const collection =await databaseService.getCollection(topicname);
    const response  = await collection.insertMany([
      { message: 'Welcome John', topic: topicname, isRead: false },
      { message: 'Welcome Tamy', topic: topicname, isRead: true },
      { message: 'Welcome Ken', topic: topicname, isRead: false },
    ]);
    expect(response.acknowledged).toBeTruthy();
    if(response.acknowledged){
      const consumefirstData = await subscriber.subscribe(topicname);
      const consumeSecondData = await subscriber.subscribe(topicname);
      expect(consumefirstData.message).toBe('Welcome John');
      expect(consumeSecondData.message).toBe('Welcome Ken');
    }
  
  });
  
});