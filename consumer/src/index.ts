import http from 'http';
import boxen from 'boxen';
import { getMessage } from './helper/subscriber'


const consumedefaulttopic = () => {
  console.log(boxen('Consumption of "default" topic started'));
  setInterval(async () => {
    await getMessage('default');
  }, 3000);
}

const consumenotificationtopic = () => {
  console.log(boxen('Consumption of "notification" topic started'))
  setInterval(async () => {
    await getMessage('notification');
  }, 4000);
}

const requestListener = function (req: any, res: any) {
  res.writeHead(200);
  res.end('Consumption started');
}

const PORT = process.env.NODE_DOCKER_PORT_CONSUMER || 7080;
const server = http.createServer(requestListener);
consumedefaulttopic();
consumenotificationtopic();
server.listen(PORT);









