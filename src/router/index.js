import { createRouter, createWebHistory } from 'vue-router'

import AuthGuard from './auth-guard'
import Auth from '../Pages/Auth.vue'
import Main from '../Pages/Main.vue'
import AddProduct from '../Pages/AddProduct.vue'
import EditProduct from '../Pages/EditProduct.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            component: Main
        },
        {
            path: '/auth',
            component: Auth
        },
        {
            path: '/new-product',
            component: AddProduct,
            beforeEnter: AuthGuard
        },
        {
            path: '/edit-product/:id',
            component: EditProduct,
            beforeEnter: AuthGuard
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { left: 0, top: 0 }
    }
})

export default router
