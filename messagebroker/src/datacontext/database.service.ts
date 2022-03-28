import * as mongoDB from "mongodb";
import boxen from "boxen";
import config from "config";

const dbConfig = config.get('dbConfig') as any;
export class DatabaseService {

    static db?: mongoDB.Db = null;
    static client?: mongoDB.MongoClient = null;

    async connectToDatabase(connectionString: string, databaseName: string) {

        try {

            const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString, {
                connectTimeoutMS: dbConfig['SOCKET_TIME_OUT_MS'],
                serverSelectionTimeoutMS: dbConfig['CONNECTION_TIMEOUT_MS'],
            });

            await client.connect().then(dbc => {
                console.log(boxen(`Successfully connected to mongo db`));
            })
                .catch(err => {
                    throw err;
                });

            const db: mongoDB.Db = client.db(databaseName);

            DatabaseService.db = db;
            DatabaseService.client = client;

            console.log(boxen(`Successfully connected to database: ${db.databaseName}`));

        } catch (e) {

            console.log(boxen("Database failed to start", { borderColor: "red" }), e);
            process.exit(1);
        }
    }

    async getCollection(collectionName: string, maxSize = 100) {
        try {

            const exist = await DatabaseService.db.listCollections({ name: collectionName }).hasNext();
            let result: mongoDB.Collection = null;
            const SIZE = 1000000;

            if (!exist) {
                result = await DatabaseService.db.createCollection(collectionName, { capped: true, size: SIZE, max: maxSize })
                console.log(boxen(`Broker  got created with max queue size ${SIZE}`));
            } else {
                result = await DatabaseService.db.collection(collectionName);
            }
            return result;

        } catch (e) {
            console.log(boxen("App Failed to start", { borderColor: "red" }), e);
        }
    }

    async destroyclient() {

        if (DatabaseService.client) {
            DatabaseService.client.close();
        }
    }
}