
import axios from 'axios';

let http = {};

const ajaxUrl = 'http://localhost:8087';
http.baseUrl = ajaxUrl;

http.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 8000,
    headers: {
        token: localStorage.token
    }
});

export default http;
