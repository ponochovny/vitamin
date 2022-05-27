<template>
	<ul :class="`${myClass} list`" v-if="characteristics">
		<li v-for="item of characteristics" :key="item.title" class="list__item">
			<div class="list__title">
				{{ itemBefore + item.title + itemAfter }}
			</div>
			<div class="list__progress progress">
				<div class="progress__bar">
					<span
						:style="{
							backgroundColor: bgColors(),
							width: `${calculatedPercentComputed(
								item,
								averageProductsCharacteristics
							)}%`,
						}"
					></span>
				</div>
				<div class="progress__label">
					{{ calculatedPercentComputed(item, averageProductsCharacteristics) }}%
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
import { calculatedPercent } from '../../../tools/calculatePercentage'
import { colors } from '../../../constants/colors'

export default {
	props: {
		averageProductsCharacteristics: Array,
		characteristics: Array,
		itemBefore: {
			type: String,
			default: '',
		},
		itemAfter: {
			type: String,
			default: '',
		},
		myClass: {
			type: String,
			default: '',
		},
	},
	name: 'app',
	data() {
		return {
			colors: [],
		}
	},
	methods: {
		bgColors: function () {
			let max = this.colors.length > 0 ? this.colors.length - 1 : 0
			let randomNumber = Math.floor(Math.random() * max)
			let result =
				this.colors.length > 0 ? this.colors[randomNumber].value : '#fff'
			return result
		},
		calculatedPercentComputed(item, averageProductsCharacteristics) {
			return calculatedPercent(item, averageProductsCharacteristics)
		},
	},
	mounted() {
		this.colors = [...colors]
	},
	computed: {
		totalPrecent() {
			let times = 0
			let summ = 0

			for (let item of this.characteristics) {
				times++
				summ += +this.calculatedPercentComputed(
					item,
					this.averageProductsCharacteristics
				)
			}

			return summ / times
		},
	},
}
</script>

<style lang="scss">
.list {
	&__item {
		margin-bottom: 33px;
	}
	&__title {
		display: inline-block;
		width: 175px;

		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 21px;

		color: #000000;
	}
}
</style>
