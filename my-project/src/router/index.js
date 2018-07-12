import Vue from 'vue'
import Router from 'vue-router'
import Tennis from '../components/Tennis.vue'
import VueTimers from 'vue-timers'
 
Vue.use(VueTimers)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tennis',
      component: Tennis
    }
  ]
})
