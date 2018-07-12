// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Tennis from './components/Tennis.vue'
import router from './router'
import VueTimers from 'vue-timers'
 
Vue.use(VueTimers)

Vue.component('Tennis', Tennis)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
