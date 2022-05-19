<template>
	<div class="Auth">
		<form @submit.prevent="submit">
			<h1 @click="loginAction = !loginAction">
				{{ loginAction ? 'Log in' : 'Register' }}
			</h1>
			<p>Email:</p>
			<input type="text" v-model="email" />
			<p>Password:</p>
			<input type="password" v-model="password" />
			<button type="submit">
				{{ loading ? '...' : loginAction ? 'Enter' : 'Register' }}
			</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'auth',
	components: {},
	data() {
		return {
			email: '',
			password: '',
			loginAction: true,
		}
	},
	computed: {
		loading() {
			return this.$store.getters.loading
		},
	},
	methods: {
		submit() {
			if (this.loginAction) {
				this.$store
					.dispatch('loginUser', { email: this.email, password: this.password })
					.then(() => {
						this.$router.push('/')
					})
					.catch((err) => {
						console.log(err)
					})
			} else {
				this.$store
					.dispatch('registerUser', {
						email: this.email,
						password: this.password,
					})
					.then(() => {
						this.$router.push('/')
					})
					.catch((err) => console.log(err))
			}
		},
	},
	created() {
		if (this.$route.query['loginError']) {
			this.$store.dispatch('setError', 'Please log in to access this page')
			// this.$toasted.error('Please log in to access this page')
		}
	},
}
</script>

<style lang="scss">
.Auth {
	margin-top: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	h1 {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 48px;
		line-height: 56px;

		color: #000000;

		margin-bottom: 25px;

		padding: 5px 15px;
		border-radius: 5px;
		transition: background-color 0.15s ease;
		&:hover {
			background-color: #f2f2f2;
			cursor: pointer;
			transition: background-color 0.05s ease;
		}
	}
	p {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 21px;

		color: #000;

		margin-bottom: 8px;
	}
	input {
		width: 263px;
		height: 41px;
		margin-bottom: 27px;
		padding: 0 7px;
		background-color: #f2f2f2;
		border: 1px solid #b5b5b5;
		border-radius: 5px;

		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 21px;

		color: #606060;

		text-align: center;

		transition: color 0.35s ease;

		&:focus {
			color: #000;
		}
	}
	button {
		padding-left: 30px;
		padding-right: 30px;
	}
}
</style>
