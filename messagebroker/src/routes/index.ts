import bodyParser from "body-parser";
import { Application } from "express";
import { Publisher } from "../brokerservices/publisher";
import { Subscriber } from "../brokerservices/subscriber";
import { MessageDTO } from "../ViewModel/messageDTO";
import { fork } from 'child_process';
import path from 'path';
import { spawn } from 'child_process';

const subscriber = new Subscriber();
const publisher = new Publisher();

export const registerAllRoutes = (app: Application) => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: "5mb" }));

    // subscribe route.

    const child = spawn('node', [path.join( path.resolve(__dirname, '..'), '/brokerservices/subscriber.js')], {
    detached: true,
    stdio: 'ignore'
    });

    child.unref();

    app.get('/subscribe/:topic', async function (req, res) {
     
            const topic = req.params.topic;
            const data = await subscriber.subscribe(topic);
            if (data) {
                res.send(data['message']);
            } else {
                res.send('waiting for message ..');
            }
       
    })

    // publish route.
    app.post('/publish', async function (req, res) {
        const payload = req.body as MessageDTO;
        await publisher.publish(payload)
        res.send('Request was successful');
    })

};