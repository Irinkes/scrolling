import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/TopPage'
import 'fullpage.js/vendors/scrolloverflow'
// import './fullpage.scrollHorizontally.min'
import VueFullPage from 'vue-fullpage.js'
import vueSmoothScroll from 'vue2-smooth-scroll'

Vue.use(vueSmoothScroll)
Vue.use(VueFullPage)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TopPage',
      component: TopPage
    }
  ]
})
