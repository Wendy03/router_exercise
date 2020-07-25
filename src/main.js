import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import App from './App.vue';
import router from './router';
import dateFilter from './filters/date';
import moneyFilter from './filters/money';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);

Vue.filter('date', dateFilter);
Vue.filter('money', moneyFilter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
