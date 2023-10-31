import axios from "axios";
import { base_url } from "../../types";


export const getOcasionalDates = async () => {
    let events = [];
    try {
        const res = await axios.get(base_url+'calendar')
        events = res.data;
    } catch (e){
        console.log(e);
    }
    return events
}