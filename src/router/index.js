import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

  const routes = [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      component:()=>import('../components/Login')
    },
      {
          path:'/home',
          component:()=>import('../components/Home'),
          redirect: '/welcome',
          children:[
              {
                  path:'/welcome',
                  component:()=>import('../components/Welcome')
              },
              {
                  path:'/users',
                  component:()=>import('../components/Users')
              }
          ]
      }
]

const router = new VueRouter({
  routes
})
//路由导航守卫
router.beforeEach((to, from, next) => {
    if(to.path ==='/login') return next()
     //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
})

export default router
