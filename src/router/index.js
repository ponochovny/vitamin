import { createRouter, createWebHistory } from 'vue-router'

import AuthGuard from './auth-guard'
import Auth from '../pages/Auth.vue'
import Main from '../pages/Main.vue'
import AddProduct from '../pages/AddProduct.vue'
import EditProduct from '../pages/EditProduct.vue'
import Profile from '../pages/Profile.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '',
			component: Main,
		},
		{
			path: '/auth',
			component: Auth,
		},
		{
			path: '/new-product',
			component: AddProduct,
			beforeEnter: AuthGuard,
		},
		{
			path: '/edit-product/:id',
			component: EditProduct,
			beforeEnter: AuthGuard,
		},
		{
			path: '/profile',
			component: Profile,
			// beforeEnter: AuthGuard,
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		return { left: 0, top: 0 }
	},
})

export default router
