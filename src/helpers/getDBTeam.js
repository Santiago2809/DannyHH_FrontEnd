import { baseApi } from "./axiosBase";

export const getDbTeam = async() => {
    let team = []
    try {
        const res = await baseApi.get('/team')
        //? Sera bueno la manera de arriba o esta  ->  const res = await axios.get(base_url+"team");
        team = res.data;
        
    } catch( error ){
        console.log(error);
    } 
    return team;
}