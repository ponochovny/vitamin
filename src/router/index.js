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
            component: Main,
            // beforeEnter: AuthGuard
        },
        {
            path: '/auth',
            component: Auth
        },
        {
            path: '/new-product',
            component: AddProduct
        },
        {
            path: '/edit-product/:id',
            component: EditProduct
        },
      // { path: '/edit-product', component:  },
      // { path: '/products', component:  },
    ],
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})