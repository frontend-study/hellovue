
import axios from 'axios';
import router from '../router'

let http = {};

const ajaxUrl = 'http://localhost:8087';

http.baseUrl = ajaxUrl;

http.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 2700//, // 2.7 秒
    // headers: {
    //     token: localStorage.token
    // }
});

// http.ajax = function(uri, method, param) {
// }

let _router = router;

// 响应拦截器
http.ajax.interceptors.response.use(function (response) {
    // console.log("响应拦截器 " + JSON.stringify(response.data));
    // console.log("拦截器 " + JSON.parse(response.data));
    if (response.data.code === 1001) {
        console.log("响应拦截器 生效");
        _router.push({name: 'Login'});
        return;
    }
    // console.log("响应拦截器 ");
    return response;
}, function (error) {
    console.log("响应拦截器错误");
    return Promise.reject(error);
});

// 请求拦截器
http.ajax.interceptors.request.use(function (config) {
    // console.log("请求拦截器 " + JSON.stringify(config));
    // console.log("请求拦截器 " + config.headers.token);
    config.headers.token = localStorage.token;
    // console.log("请求拦截器 " + JSON.stringify(config));
    console.log("请求拦截器 " + config.headers.token);

    return config;
}, function (error) {
    console.log("请求拦截器错误");
    return Promise.reject(error);
});

export default http;
