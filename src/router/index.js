import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import User from '@/components/user/User'
import Rights from '@/components/power/Rights'
import Roles from '@/components/power/Roles'
import Categories from '@/components/product/Categories'
import Params from '@/components/product/Params'
import Order from '@/components/order/Order'
import Report from '@/components/report/Report'
import GoodList from '@/components/product/GoodList'
import AddProduct from '@/components/product/AddProduct'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Categories },
        { path: '/params', component: Params },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report },
        { path: '/goods', redirect: '/goods/list' },
        { path: '/goods/list', component: GoodList },
        { path: '/goods/add', component: AddProduct }
      ]
    }
  ]
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
