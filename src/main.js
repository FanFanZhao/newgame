import Vue from 'vue'  //加载vue
import App from './App' //加载入口文件
import router from './router/index.js' //加载路由配置文件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import $ from 'jquery'  //加载jquery


import Axios from './shujudata/api.js'; //加载接口文件
import Public from './shujudata/public.js' //加载公用js方法文件
import Barrage from './shujudata/barrage.js' //加载弹幕文件
import Explosioneffect from './shujudata/explosioneffect.js' //加载弹幕文件

import VueClipboard from 'vue-clipboard2';//加载复制插件
import VueCookies from 'vue-cookies'//加载cookie


import indexcss from './assets/index.less'; //加载接口文件

import echarts from 'echarts';
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');







Vue.prototype.$echarts = echarts;

Vue.use(iView);
Vue.use(VueClipboard);
Vue.use(VueCookies);

Vue.prototype.$http= Axios;
Vue.prototype.$public = Public;
Vue.prototype.$barrage = Barrage;
Vue.prototype.$explosioneffect = Explosioneffect;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



// WEBPACK FOOTER //
// ./src/main.js