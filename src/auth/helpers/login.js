import axios from 'axios';
import { base_url } from '../../types';

export const login = async ( user, password ) => {

    try {
        return await axios({
            method: 'POST',
            url: base_url + '/auth',
            data: {
                user,
                password
            },
        })
    } catch (e) {
        return {data: null};
    }
}