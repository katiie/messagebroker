import http from 'http';
import boxen from 'boxen';
import { getMessage } from './helper/subscriber'

const requestListener = function (req: any, res: any) {
  res.writeHead(200);
  res.end('Consumption started');
}

const server = http.createServer(requestListener);
server.listen(7080);

setInterval(async () => {
  console.log(boxen('Consumption of "default" topic started'));
  await getMessage('default');
}, 3000);


setInterval(async () => {
  console.log(boxen('Consumption of "notification" topic started'))
  await getMessage('notification');
}, 4000);






