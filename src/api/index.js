import axios from "axios";

const urlBase = import.meta.env.VITE_API_BASE || 'https://dummyjson.com';

const axiosBase = axios.create({
    baseURL: urlBase,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

export default axiosBase;
