import axios from 'axios';
import { base_url } from '../../types';

export const getDbClients = async () => {
    let customers = [];
    try {
        const res = await axios.get(base_url+'customer');
        customers = res.data;
    } catch(e){
        console.log(e);
    }
    return customers;
}