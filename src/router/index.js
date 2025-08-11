import Vue from 'vue'
import VueRouter from 'vue-router'
import lanhu_xinshequshujumianbanshouye from '../views/lanhu_xinshequshujumianbanshouye/index.vue'

Vue.use(VueRouter)

const routes = [
    {
    path: '/',
    redirect: "/lanhu_xinshequshujumianbanshouye"
  },
  {
    path: '/lanhu_xinshequshujumianbanshouye',
    name: 'lanhu_xinshequshujumianbanshouye',
    component: lanhu_xinshequshujumianbanshouye
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
