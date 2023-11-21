import axios from "axios";
import { base_url } from "../types";

export const getDbTeam = async() => {
    let team = []
    try {
        const res = await axios.get(base_url+"team");
        team = res.data;
        
    } catch( error ){
        console.log(error);
    } 
    return team;
}