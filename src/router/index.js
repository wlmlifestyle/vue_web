import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: './login'
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
