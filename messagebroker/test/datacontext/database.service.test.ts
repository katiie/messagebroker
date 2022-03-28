import { DatabaseService } from '../../src/datacontext/database.service'
import { expect, describe, beforeAll, afterAll,it } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';

const databaseService = new DatabaseService();

describe('insert', () => {

  beforeAll(async () => {

    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await databaseService.connectToDatabase(uri,"test");
  });

  afterAll(async () => {
    await databaseService.destroyclient();
  });

  
  it('createting a collection populates DatabaseService static properties', async () => {
    
    expect(DatabaseService.client).toBeTruthy();
    expect(DatabaseService.db).toBeTruthy();
   
  });

  it('calling GetCollection returns a collection', async () => {
    
    const collection =await databaseService.getCollection("testCollection");
    const response  = await collection.insertOne( {message: 'John', topic: "teat", isRead: true})
    expect(collection).toBeTruthy();
    expect(response.acknowledged).toBeTruthy();

  });
  
});