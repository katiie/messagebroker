import http from 'http';
import boxen from 'boxen';
import { saveMessage } from './helper/producer'

const requestListener = function (req: any, res: any) {
  res.writeHead(200);
  res.end('Consumption started');
}

const server = http.createServer(requestListener);
server.listen(7050);

setInterval(async () => {
  console.log(boxen('Producing to "default" topic started'));
  await saveMessage('default');
}, 1000);


setInterval(async () => {
  console.log(boxen('Producing to "notification" topic started'));
  await saveMessage('notification');
}, 1000);






