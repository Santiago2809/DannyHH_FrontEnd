import axios from 'axios';

export const getDbClients = async () => {
    let customers = [];
    try {
        const res = await axios.get('http://localhost:3000/customer');
        customers = res.data;
    } catch(e){
        console.log(e);
    }
    return customers;
}