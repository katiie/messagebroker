import config from "config";
import axios from "axios";
import boxen from 'boxen';

const brokerDetail = config.get('broker') as any;
const url = brokerDetail["appurl"];

export const saveMessage = async (topic: string) => {

    try {
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
