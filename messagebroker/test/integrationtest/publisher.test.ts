import {DatabaseService} from '../../src/datacontext/database.service'
import { expect, describe, beforeAll, afterAll,it } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Publisher } from '../../src/brokerservices/publisher';
import { MessageDTO } from '../../src/ViewModel/messageDTO';

const databaseService = new DatabaseService();
const publisher = new Publisher();

describe('publisher', () => {

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
    const payload = { message: 'Welcome John', topic: topic, isRead: false } as MessageDTO;
    const data =await publisher.publish(payload);
    expect(data).toBeTruthy();
  });
  
});