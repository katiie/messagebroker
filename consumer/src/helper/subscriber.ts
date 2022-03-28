import config from "config";
import axios from "axios";
import boxen from 'boxen';

const brokerDetail = config.get('broker') as any;
const url = brokerDetail["appurl"];

export const getMessage = async (topic: string) => {

    try {
        console.log(`${url}/subscribe/${topic}`);
        await axios.get(`${url}/subscribe/${topic}`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                if (response?.status !== 200) {
                    console.error(boxen('service unreachable'));
                }
                else {
                    console.log(response.data)
                }

            })
    }
    catch {
        console.error(boxen("try again later"));
    }
}
