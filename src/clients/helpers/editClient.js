import axios from 'axios';
import { base_url } from '../../types';
import { getToken } from '../../helpers/authToken';



export const editClient = async(id, customer = {}) => {
    
    try {
        const res = await axios({
            method: 'put',
            url: `${base_url}/customer/editCustomer`,
            data: {
                id,
                edit_Values: customer
            },
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        })
        return res;
    }catch(err){
        console.log(err);
        return Promise.reject(err);
        // notifyError("Ups! Something gone wrong")
    }

}