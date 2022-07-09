<template>
	<div class="AddProduct">
		<h2>Новый продукт</h2>
		<input type="text" v-model="productData.title" />
		<h3>
			БЖУ
			<div></div>
		</h3>
		<ul>
			<li
				v-for="(item, i) of productData.characteristics.foodEnergy"
				:key="item.title"
			>
				<span>{{ item.title }}</span>
				<input
					type="text"
					v-model="productData.characteristics.foodEnergy[i].versions[0].value"
				/>
			</li>
		</ul>
		<h3>
			Витамины
			<div></div>
		</h3>
		<ul>
			<li
				v-for="(item, i) of productData.characteristics.vitamins"
				:key="item.title"
			>
				<span>Витамин {{ item.title }}, мг</span>
				<input
					type="text"
					v-model="productData.characteristics.vitamins[i].versions[0].value"
				/>
			</li>
		</ul>
		<h3>
			Микро/Макро
			<div></div>
		</h3>
		<ul>
			<li
				v-for="(item, i) of productData.characteristics.macroMicro"
				:key="item.title"
			>
				<span>{{ item.title }}</span>
				<input
					type="text"
					v-model="productData.characteristics.macroMicro[i].versions[0].value"
				/>
			</li>
		</ul>
		<br />

		<ul>
			<li>
				<span>Источник</span>
				<input
					v-for="item of columns"
					:key="item"
					type="text"
					v-model="productData.source[item - 1].origin"
				/>
			</li>
		</ul>

		<!-- <p>Источник</p>
        <input v-for="item of columns" :key="item" type="text" v-model="productData.source[item-1].origin"> -->
		<br />
		<button @click="saveData">{{ loading ? '...' : 'Save' }}</button>
	</div>
</template>

<script>
export default {
	name: 'add-product',
	components: {},
	data() {
		return {
			productData: {
				title: '',
				characteristics: {},
				source: [{ origin: '' }],
			},
			columns: 1,
		}
	},
	computed: {
		loading() {
			return this.$store.getters.loading
		},
	},
	methods: {
		saveData: function () {
			// 1. send new data to existed product to edit
			// 2. edit basic characteristics if there are new fields
			this.$store
				.dispatch('createProduct', {
					...this.productData,
				})
				.then(() => {
					this.$router.push('/')
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},
	mounted() {
		let chars = {}
		for (let key in this.$store.getters.userChars) {
			chars[key] = []
			for (let item of this.$store.getters.userChars[key]) {
				let innerItem = {
					title: item.title,
					versions: [{ value: 0, origin: '' }],
				}
				chars[key].push(innerItem)
			}
		}

		this.productData = {
			title: '',
			characteristics: { ...chars },
			source: [{ origin: '' }],
		}
	},
}
</script>

<style lang="scss">
.AddProduct {
	padding: 60px;
	input {
		width: 205px;
		margin-bottom: 20px;
	}
	h2 {
		margin-bottom: 24px;
	}
	h3 {
		display: flex;
		align-items: center;
		margin-bottom: 32px;
		white-space: nowrap;
		div {
			display: inline-block;
			width: 100%;
			height: 2px;
			background: #bcbcbc;
			margin-left: 16px;
		}
	}
	ul {
		margin-bottom: 22px;
		li {
			margin-bottom: 16px;
			span {
				display: inline-block;
				width: 140px;
			}
			input {
				width: 60px;
				margin-bottom: 0;
			}
		}
	}
}
</style>
