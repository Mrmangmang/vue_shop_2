import Vue from  'vue'
import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL='https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios