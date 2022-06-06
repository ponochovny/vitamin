import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// import AuthGuard from './auth-guard'
// import Auth from '../pages/Auth.vue'
// import Main from '../pages/Main.vue'

// Temporary
import Main from '../pages/Main.vue'

// import AddProduct from '../pages/AddProduct.vue'
// import EditProduct from '../pages/EditProduct.vue'
// import Profile from '../pages/Profile.vue'
// import PageNotFound from '../pages/PageNotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: Main,
  },
  // {
  // 	path: '/auth',
  // 	component: Auth,
  // },
  // {
  // 	path: '/new-product',
  // 	component: AddProduct,
  // 	beforeEnter: AuthGuard,
  // },
  // {
  // 	path: '/edit-product/:id',
  // 	component: EditProduct,
  // 	beforeEnter: AuthGuard,
  // },
  // {
  // 	path: '/profile',
  // 	component: Profile,
  // 	// beforeEnter: AuthGuard,
  // },
  {
    path: '/404',
    name: 'PageNotFound',
    component: () => import('../pages/PageNotFound.vue'),
  },
  { path: '/:catchAll(.*)', redirect: '/404' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  },
})

export default router
