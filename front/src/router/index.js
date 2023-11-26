import { createRouter, createWebHistory } from 'vue-router'
import ShopTemplateVue from '@/views/ShopTemplate.vue'
import CategoryView from '@/views/CategoryView.vue'
import ProductView from '@/views/ProductView.vue'
import MainView from '@/views/AdminMainView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ShopTemplateVue
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminTemplate.vue'),
    children: [
      {
        path: '',
        name: 'admin-main',
        component: MainView
      },
      {
        path: 'category',
        name: 'admin-category',
        component: CategoryView
      },
      {
        path: 'product',
        name: 'admin-product',
        component: ProductView
      }
      // Другие подстраницы админки
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
