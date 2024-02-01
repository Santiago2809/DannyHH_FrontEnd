import axios from 'axios';
import { base_url } from '../../types/';

const baseUrl = `${base_url}team`;
const errorMesagge = "Ups! Algo ha ocurrido mal";

export async function getTeam(){
    try {
        const { data } = await axios.get(baseUrl);
        return data;
    } catch (e) {
        console.log(e);
        return Promise.reject(errorMesagge);
    }
}

export async function addTeammate (name, phone){
    console.log(baseUrl);
    try {
        return await axios({
            method: 'post',
            url: `${baseUrl}/addTeam`,
            data: {
                name,
                phone
            }
        })
    } catch(e){
        console.log(e);
        return Promise.reject(errorMesagge);
    }
}

export async function editTeammate(id, teamMember = {}) {
    if(Object.keys(teamMember).length < 1) return;
    try {
        return await axios({
            method: 'put',
            url: `${baseUrl}/editTeam`,
            data: {
                id,
                editValues: teamMember
            }
        })
    } catch (e) {
        console.log(e);
        return Promise.reject(errorMesagge);
    }
}

export async function delTeamMember(id){
    try {
        return await axios({
            method: 'delete',
            url: `${baseUrl}/delTeam`,
            data: {
                id: +id
            }
        })
    } catch (e) {
        console.log(e);
        return Promise.reject(errorMesagge)
    }
    
}