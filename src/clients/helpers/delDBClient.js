import axios from 'axios';
import { base_url } from '../../types';
import { getToken } from '../../helpers/authToken';

export const delDBClient = async (id) => {
    try {
        await axios({
            method: 'delete',
            url: `${base_url}/customer/delCustomer`,
            data: {
                id: +id,
            },
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        })
    }
    catch(err) {
        console.log(err);
        return Promise.reject(err);
    }
}