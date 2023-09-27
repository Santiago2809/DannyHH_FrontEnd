import axios from 'axios';

export const addDBClient = async (customer = {}) => {
    
    const { frequency, dweek, no_week, price } = customer;
    const today = new Date();
    const created = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    const db_Customer = {
        ...customer,
        frequency: frequency.length > 1 ? frequency : null,
        dweek: dweek.length > 1 ? dweek : null,
        no_week: no_week.length > 1 ? no_week : null,
        created: created,
        price: +price
    }
    try {

        const res = await axios({
            method: 'post',
            url: '//localhost:3000/customer/addClient',
            data: {
                ...db_Customer       
            }
        })
        console.log(res);
    } catch( err) {
        console.log(err);
    }
}