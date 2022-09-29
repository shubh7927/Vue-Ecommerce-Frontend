import './init'
import Vue from 'vue'
import vuetify from './plugins/vuetify'

import App from './App.vue'

import router from './router/routes'
import store from './store/store.js'


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
