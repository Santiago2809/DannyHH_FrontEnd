import axios from 'axios';
import { base_url } from '../../types';


export const editCustomerTeam = async (id,selectedTeam) => {
    try {
        const res = await axios({
            method: 'put',
            url: `${base_url}customer/editTeam`,
            data: {
                id,
                selectedTeam
            }
        })
        return res;
    } catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}