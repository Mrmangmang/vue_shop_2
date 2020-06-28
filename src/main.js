import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式表
import '../src/assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入字体图标库
import '../icon-font/iconfont.css'
import '../src/api/api'
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
