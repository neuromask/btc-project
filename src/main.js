import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.config.productionTip = false

import './style.css'
/*
import './assets/fonts/fa/css/fontawesome.css'
import './assets/fonts/fa/css/fa-brands.css'
import './assets/fonts/fa/css/fa-solid.css'
import './assets/fonts/fa/css/fa-regular.css'*/

import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App),
}).$mount('#app')

