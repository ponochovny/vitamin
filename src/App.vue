<template>
	<div>
		<Menu />
		<router-view></router-view>
	</div>
</template>

<script>
import Menu from './components/Menu/Menu.vue'
// import Toast from 'vue-toastification'
import { useToast } from 'vue-toastification'

export default {
	name: 'app',
	components: {
		Menu: Menu,
	},
	data() {
		return {
			toast: useToast(),
		}
	},
	methods: {
		closeError() {
			this.$store.dispatch('clearError')
		},
	},
	mounted() {
		this.$store.watch(
			(state) => {
				return this.$store.getters.error // could also put a Getter here
			},
			(newValue, oldValue) => {
				if (newValue) {
					this.toast.clear()
					this.toast.error(newValue, {
						position: 'bottom-center',
						timeout: 5000,
						closeOnClick: true,
						pauseOnFocusLoss: true,
						pauseOnHover: true,
						draggable: true,
						draggablePercent: 0.6,
						showCloseButtonOnHover: true,
						hideProgressBar: true,
						closeButton: 'button',
						icon: true,
						rtl: false,
					})
				}
			}
		)
	},
}
</script>

<style lang="scss"></style>
