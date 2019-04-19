import Vue from 'vue'
import Router from 'vue-router'

// import 组件
Vue.use(Router)

let router = new Router({
  // mode: 'history',
  base: '',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/components/admin.vue')
    }
  ]
})
router.beforeEach((to, from ,next) => {
  if(to.name === 'admin' && !to.params.sd) {
    next({path: '/login'})
    return;
  }
  next();
})

export default router