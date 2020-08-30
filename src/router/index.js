import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () =>import('../views/home/Home.vue')
const Cart = () =>import('../views/cart/Cart.vue')
const Sort = () =>import('../views/sort/Sort.vue')
const User = () =>import('../views/profile/User.vue')

export default new Router({
  routes: [
    {path: '',redirect: '/home'},
    {path: '/home',component: Home},
    {path: '/sort',component: Sort},
    {path: '/cart',component: Cart},
    {path: '/user',component: User},
  ],
  mode: 'history'
})