import axios from 'axios'

export const getDbClients = async () => {
    let customers = [];
    try {
        const response = await axios.get('//localhost:3000/customer');
        customers = response.data;
        console.log(response.data);
    } catch(e){
        console.log(e);
    }
    return customers;
}