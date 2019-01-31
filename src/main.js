import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
import store from './store'
import Vuex from 'vuex';

import './style.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import BootstrapVue from 'bootstrap-vue'

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(BootstrapVue);

new Vue({
    store,
  render: h => h(App),
}).$mount('#app');