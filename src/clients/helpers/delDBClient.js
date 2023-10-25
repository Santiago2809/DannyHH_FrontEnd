import axios from 'axios';
import { base_url } from '../../types';

export const delDBClient = async (id) => {
    try {
        await axios({
            method: 'delete',
            url: `${base_url}customer/delCustomer`,
            data: {
                id: +id,
            }
        })
    }
    catch(err) {
        console.log(err);
        return Promise.reject(err);
    }
}