import express from 'express';
import boxen from 'boxen';
import { DatabaseService } from './datacontext/database.service';
import { registerAllRoutes } from './routes';
import 'dotenv/config'

const app = express();
const port: number = Number.parseInt(process.env.PORT) || 8083;
const databaseService = new DatabaseService();

async function main() {
    const mongoDbURl = process.env.DB_MONGODBURL;
    const mongoDbName = process.env.DB_DATABASENAME;
    try {
        // Connect to the MongoDB cluster
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

