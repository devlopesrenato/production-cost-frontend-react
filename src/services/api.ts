import axios from 'axios';
import { getToken } from './cookies';

const token = getToken()

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://api-custodeproducao.onrender.com/",
    headers: {
        Authorization: `Bearer ${token}`
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        console.log(error);
        return {
            status: error.response.status,
            code: error.core,
            message: error.message,
            data: error.response.data,
        };
    },
);

export default api;
