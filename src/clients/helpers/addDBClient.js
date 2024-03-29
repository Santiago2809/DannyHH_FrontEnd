import axios from 'axios';
import { base_url } from '../../types';
import { getToken } from '../../helpers/authToken';

export const addDBClient = async (customer = {}) => {

    const { frequency, dweek, no_week, price, category, duration, comments } = customer;
    const today = new Date();
    const created = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const db_Customer = {
        ...customer,
        comments: comments.trim() === "" ? null : comments.trim(),
        frequency: category != 'full_time' ? null : frequency.length > 1 ? frequency : null,
        dweek: category != 'full_time' ? null : dweek.length > 1 ? dweek : null,
        no_week: category != 'full_time' ? null : no_week.length > 1 ? no_week : null,
        created: created,
        price: +price,
        duration: +duration
    }
    try {

        return await axios({
            method: 'post',
            url: `${base_url}/customer/addClient`,
            data: {
                ...db_Customer
            },
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        })
    } catch (err) {
        console.log(err);
    }
}