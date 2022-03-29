import http from 'http';
import boxen from 'boxen';
import { saveMessage } from './helper/producer'

const producetodefaulttopic = () => {
  console.log(boxen('Producing to "default" topic started'));
  setInterval(async () => {
    await saveMessage('default');
  }, 1000);
}

const producetonotificationtopic = () => {
  console.log(boxen('Producing to "notification" topic started'));
  setInterval(async () => {
    await saveMessage('notification');
  }, 1000);
}

const requestListener = function (req: any, res: any) {
  res.writeHead(200);
  res.end('Consumption started');
}

const PORT = process.env.NODE_DOCKER_PORT_PRODUCER || 7050;
const server = http.createServer(requestListener);
producetodefaulttopic();
producetonotificationtopic();
server.listen(PORT);









