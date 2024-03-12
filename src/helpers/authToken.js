import axios from 'axios';
import { base_url } from '../types';

export const setToken = (token) => {
    localStorage.setItem('token', token);
}
export const getToken = () => {
    return localStorage.getItem('token');
}

export const isAuth = async () => {
    const token = getToken();
    try {
        const resp = await axios({
            method: 'get',
            url: base_url + '/auth/verify',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return Object.keys(resp.data).length > 0 ? true : false;
    } catch (err) {
        console.log(err);
        return false;
    }
}