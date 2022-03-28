/**
 * subscriber
 */

import boxen from "boxen";
import { DatabaseService } from "../datacontext/database.service";

const databaseService = new DatabaseService();

export class Subscriber {

    async subscribe(routingkey: string) {

        try {
            const filter = { isRead: false };

            const collection = await databaseService.getCollection(routingkey);
            const data = await collection.findOne(filter);
            if (!data) {
                return null;
            }
            await collection.updateOne({_id: data._id}, {"$set":{"isRead":true}});
            return data;
        }
        catch (e) {

            console.log(boxen("Subscriber error", { borderColor: "red" }), e);
        }
    }
}
