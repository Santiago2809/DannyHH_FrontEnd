import axios from 'axios';
import { base_url } from '../../types';

export const confirmFinishEvent = async (finishedEvent) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${base_url}calendar/confirmEvent`,
            data: {
                event: finishedEvent
            }
        });
        return res;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }   
}