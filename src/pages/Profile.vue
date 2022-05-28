<template>
	<div class="Profile">
		<div class="Profile__title">Profile</div>
		<Spinner v-if="isLoading" />
		<div class="Profile__form" v-if="filledChars">
			<button
				type="button"
				@click="addColumn"
				:style="{ marginBottom: '20px' }"
			>
				Add column
			</button>
			<div
				class="fieldsetGroup wl-15 wi-10"
				v-for="(value, char) of charsValues"
				:key="char"
			>
				<div class="fieldset__title">{{ value }}</div>
				<div
					class="fieldset"
					v-for="(item, i) of filledChars[char]"
					:key="item"
				>
					<div class="fieldset__label">{{ item.title }}</div>
					<input
						type="number"
						min="0"
						class="fieldset__input"
						v-for="(item, j) of versionsCounter"
						:key="item"
						v-model.number.lazy="filledChars[char][i].values[j].value"
					/>
				</div>
			</div>
			<!-- Source start -->

			<div class="fieldsetGroup wl-15 wi-10">
				<div class="fieldset__title">Sources:</div>
				<div class="fieldset">
					<div class="fieldset__label"></div>
					<input
						type="text"
						class="fieldset__input"
						v-for="(item, j) of versionsCounter"
						:key="item"
						v-model.lazy="
							filledChars[Object.keys(filledChars)[0]][0].values[j].origin
						"
					/>
				</div>
			</div>
			<!-- SOURCE end -->
			<button type="button" @click="dispatchUpdateData">Update</button>
		</div>
	</div>
</template>

<script>
import { values } from '../constants/chars'
import { maxAmountVersions, fullFilledChars } from '../tools/chars'
import Spinner from '../components/Spinner/Spinner.vue'

export default {
	data() {
		return {
			wait: false,
			isLoading: false,

			filledChars: null,

			versionsCounter: 1,
			charsValues: values,
		}
	},
	components: {
		Spinner,
	},
	methods: {
		dispatchUpdateData() {
			this.$store.dispatch('updateUserChars', this.filledChars)
		},

		fill() {
			this.filledChars = fullFilledChars(this.$store.getters.userChars)

			if (this.$store.getters.userChars) {
				this.versionsCounter = maxAmountVersions(this.$store.getters.userChars)
			}
		},

		addColumn() {
			for (const [key, _] of Object.entries(this.charsValues)) {
				this.filledChars[key] = this.filledChars[key].map((item) => {
					const newValues = [...item.values]
					newValues.push({ origin: '', value: null })
					return {
						...item,
						values: [...newValues],
					}
				})
			}

			this.versionsCounter = this.versionsCounter + 1
		},
	},
	mounted() {
		if (this.$store.state.user.user === null) {
			this.wait = true // set flag for refill
			this.isLoading = true
		} else {
			this.fill()
		}
	},
	computed: {
		userCharsVar() {
			return this.$store.getters.userChars
		},
	},
	watch: {
		userCharsVar(newValue, oldValue) {
			// console.log(`Updating from ${oldValue} to ${newValue}`)
			if (oldValue === null && this.wait) {
				this.fill()
				this.isLoading = false
			}
		},
	},
}
</script>

<style lang="scss">
.Profile {
	width: 100%;
	max-width: 1024px;
	margin: 0 auto;
	margin-top: 20px;
	margin-bottom: 20px;
	&__title {
		font-size: 36px;
		margin-bottom: 20px;
	}
}
</style>
