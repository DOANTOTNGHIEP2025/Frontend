import axios from 'axios';


const client = axios.create({
    // baseURL: 'https://medi-backend-blbb.onrender.com/',
    baseURL: 'http://localhost:4000',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
