import Vue from  'vue'
import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL='https://www.liulongbin.top:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



Vue.prototype.$http = axios
