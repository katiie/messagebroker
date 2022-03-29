import 'dotenv/config'
import axios from 'axios';
import boxen from 'boxen';

const url =  process.env.MESSAGE_BROKER_URL;
export const saveMessage = async (topic: string) => {

    try {
        console.log(`${url}/publish :${topic}`);
        const payload = { message: `Sent from ${topic}: ${Date()}`, topic: topic }

        const response = await axios.post(`${url}/publish`, payload);
        if (response?.status !== 200) {
            console.error(boxen('service unreachable'));
        }
    }
    catch {
        console.error(boxen("try again later"))
    }
}
