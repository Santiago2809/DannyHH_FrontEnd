import axios from "axios";
import { base_url } from "../types";
import { getToken } from "./authToken";

export const baseApi = axios.create({
    baseURL: base_url,
    headers: {
        Authorization: "Bearer " + getToken()
    }
})