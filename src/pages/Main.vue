<template>
	<div class="Main">
		<template v-if="isUserLoggedIn">
			<ProductsSearch />
			<div class="Main__choosenProducts">
				<h2 :style="{ marginBottom: '35px' }">Выбранные продукты</h2>
				<ChoosenProducts />
			</div>
			<div class="Main__filledChars">
				<h2 :style="{ marginBottom: '35px' }">От дневной нормы</h2>
				<FilledChars />
			</div>
			<History :items="registeredMeals" />
		</template>
		<template v-else>
			<h2 style="width: 100%; text-align: center; margin-top: 60px">
				You're not logged in. <router-link to="/auth">Log in</router-link>
			</h2>
		</template>
	</div>
</template>

<script>
import FilledChars from '../components/ShowUp/FilledChars.vue'
import ProductsSearch from '../components/ProductsSearch/ProductsSearch.vue'
import ChoosenProducts from '../components/ShowUp/ChoosenProducts/ChoosenProducts.vue'
import History from '../components/ShowUp/History/History.vue'

export default {
	name: 'app',
	components: {
		FilledChars: FilledChars,
		ProductsSearch: ProductsSearch,
		ChoosenProducts: ChoosenProducts,
		History: History,
	},
	data() {
		return {
			isLoggedIn: true,
		}
	},
	computed: {
		isUserLoggedIn() {
			return this.$store.getters.isUserLoggedIn
		},
		registeredMeals() {
			return this.$store.getters.registeredMeals
		},
	},
}
</script>

<style lang="scss">
.Main {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
	padding: 0 45px;
	.ProductsSearch {
		margin-top: 56px;
		margin-right: 96px;
	}
	.ChoosenProducts {
		margin-right: 96px;
	}
	&__choosenProducts,
	&__filledChars {
		margin-top: 56px;
	}
}

@media (max-width: 1440px) {
	.Main {
		.ProductsSearch {
			margin-top: 36px;
			margin-right: 50px;
		}
		.ChoosenProducts {
			max-width: 530px;
			min-width: 420px;
			margin-right: 50px;
		}
		&__choosenProducts,
		&__filledChars {
			margin-top: 36px;
		}
	}
}
</style>
