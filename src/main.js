import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false

import Vuex from 'vuex';
Vue.use(Vuex);

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import './style.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App),
}).$mount('#app')