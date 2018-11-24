import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Checkout from '@/views/Checkout'
import OrderConfirm from '@/views/Checkout-2'
import Payment from '@/views/Checkout-3'
import FinalPage from '@/views/FinalPage'
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
    },
    {
      path:'/payment',
      name:'Payment',
      component:Payment
    },
    {
      path:'/finalPage',
      name:'FinalPage',
      component:FinalPage
    }
  ]
})

