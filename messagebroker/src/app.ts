import express from "express";
import boxen from "boxen";
import config from "config";
import { DatabaseService } from "./datacontext/database.service";
import { registerAllRoutes } from "./routes";

const dbConfig = config.get('dbConfig') as any;
const app = express();
const port: number = Number.parseInt(process.env.PORT) || 8083;
const databaseService = new DatabaseService();

async function main() {
    const connectionstring = dbConfig['connectionstring'];
    try {
        // Connect to the MongoDB cluster
        databaseService.connectToDatabase(connectionstring, "msgBrk");

        app.get("/", (req, res) => {
            res.json("Message broker...");
        });

        registerAllRoutes(app);

        app.listen(port, () => {
            console.log(
                boxen(`App Started http://localhost:${port}`, {
                    padding: 0,
                    borderStyle: "double",
                    borderColor: "green",
                })
            );
        });
    } catch (e) {
        console.log(boxen("App Failed to start", { borderColor: "red" }), e);
    } finally {
        await databaseService.destroyclient();
    }
}

main().catch(console.error);

