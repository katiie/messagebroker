import express from 'express';
import boxen from 'boxen';
import { DatabaseService } from './datacontext/database.service';
import { registerAllRoutes } from './routes';
import { getUrl } from  './datacontext/dbconfig'
import 'dotenv/config'

const app = express();
const port: number = Number.parseInt(process.env.NODE_DOCKER_PORT) || 8083;
const databaseService = new DatabaseService();

async function main() {
    let mongoDbURl = process.env.DB_MONGODBURL;
    const mongoDbName = process.env.DB_DATABASENAME;
    try {
        console.log(boxen('ENV: ' + process.env.MESSAGEBROKER_ENVIRONMENT))
        // Connect to the MongoDB cluster
        if(process.env.MESSAGEBROKER_ENVIRONMENT === 'Production'){
            mongoDbURl = getUrl()
        }
        databaseService.connectToDatabase(mongoDbURl, mongoDbName);

        app.get('/', (req, res) => {
            res.json('Message broker...');
        });

        registerAllRoutes(app);

        app.listen(port, () => {
            console.log(
                boxen(`App Started http://localhost:${port}`, {
                    padding: 0,
                    borderStyle: 'double',
                    borderColor: 'green',
                })
            );
        });
    } catch (e) {
        console.log(boxen('App Failed to start', { borderColor: 'red' }), e);
    } finally {
        await databaseService.destroyclient();
    }
}

main().catch(console.error);

