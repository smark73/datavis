import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Circles1 from '../components/Circles1.vue'
import SinWave from '../components/SinWave.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cirlces1',
    name: 'Circles1',
    component: Circles1
  },
  {
    path: '/sinwave',
    name: 'SinWave',
    component: SinWave
  },
]

const router = new VueRouter({
  routes
})

export default router
