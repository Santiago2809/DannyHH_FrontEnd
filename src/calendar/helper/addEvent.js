import axios from 'axios';
import { base_url } from '../../types';

export const addEvent = async (event) => {
    
    try {
        return await axios({
            method: 'POST',
            url: `${base_url}calendar/addEvent`,
            data: {
                ...event
            }
        })
    } catch (err) {
        console.log(err);
    }
    
}