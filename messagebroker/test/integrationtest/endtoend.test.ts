import {DatabaseService} from '../../src/datacontext/database.service'
import { expect, describe, beforeAll, afterAll,it } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Publisher } from '../../src/brokerservices/publisher';
import { MessageDTO } from '../../src/ViewModel/messageDTO';
import { Subscriber } from '../../src/brokerservices/subscriber';

const databaseService = new DatabaseService();
const publisher = new Publisher();
const subscriber = new Subscriber();

describe('endtoend', () => {

  beforeAll(async () => {

    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await databaseService.connectToDatabase(uri,'test');
  });

  afterAll(async () => {
    await databaseService.destroyclient();
  });

  it('publish to topic and return saved value', async () => { 
    const topic = "testCollection";
    const message = "{name: test}";
    const payload = { message: message, topic: topic, isRead: false } as MessageDTO;
    const outgoingdata = await publisher.publish(payload);
    if(outgoingdata){
      console.log('..',outgoingdata)
      const incomingdata = await subscriber.subscribe(topic);
      expect(incomingdata.message).toEqual(message);
    }
  });
  
});