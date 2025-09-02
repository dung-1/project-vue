import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('../components/layout/DefaultLayout.vue'),
    children: [
      { 
        path: 'dashboard', 
        name: 'Dashboard', 
        component: () => import('../view/Dashboard.vue')
      },
      { 
        path: 'categories', 
        name: 'Categories', 
        component: () => import('../view/Categories.vue')
      },
      { 
        path: 'products', 
        name: 'Products', 
        component: () => import('../view/Products.vue')
      },
    ]
  },
  { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
