/**
 * publisher
 */

import boxen from 'boxen';
import { MessageDTO } from '../ViewModel/messageDTO';
import { DatabaseService } from '../datacontext/database.service';

const databaseService = new DatabaseService();

export class Publisher {

    async publish(payload: MessageDTO) {

        try {
            const data = {} as any;
            data.topic = payload.topic;
            data.message = payload.message;
            data.createdOn = new Date();
            data.isRead = false;

            const collection =await databaseService.getCollection(payload.topic);
            const result =await collection.insertOne(data);
            console.log(boxen('message published'));
            return result;
        }
        catch (e) {

            console.log(boxen('Publishing error', { borderColor: 'red' }), e);
        }
    }

}