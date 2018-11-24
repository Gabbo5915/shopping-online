import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Checkout from '@/views/Checkout'
import OrderConfirm from '@/views/Checkout-2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path:'/checkout',
      name:'Checkout',
      component:Checkout
    },
    {
      path:'/orderConfirm',
      name:'OrderConfirm',
      component:OrderConfirm
    }
  ]
})

