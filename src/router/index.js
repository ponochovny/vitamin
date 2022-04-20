import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Auth from '../Pages/Auth'
import Main from '../Pages/Main'
import AddProduct from '../Pages/AddProduct'
import EditProduct from '../Pages/EditProduct'

Vue.use(VueRouter)

export default new VueRouter({
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
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
