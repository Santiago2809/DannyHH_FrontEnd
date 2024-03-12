import axios from 'axios';
import { base_url } from '../../types';
import { getToken } from '../../helpers/authToken';

export const getDbClients = async () => {
    let customers = [];
    try {
        const res = await axios({
            method: 'get',
            url: base_url+'/customer',
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        });
        customers = res.data;
    } catch(e){
        console.log(e);
    }
    return customers;
}