<template>
	<div class="container">
		<div class="card card--sm">
			<div class="card__wrap">
				<div class="card__body card__body--empty">
					<form class="form" @submit.prevent="handleSubmit">
						<div class="form__group">
							<input v-model.trim="adminValue.email" type="email" class="form__input form__input--w100" placeholder="Логин">
						</div>
						<div class="form__group">
							<input v-model.trim="adminValue.password" type="password" class="form__input form__input--w100" placeholder="Пароль">
						</div>
						<button ref="btnSubmit" class="btn">Войти</button>
						<button @click.prevent="kekw" class="btn btn--danger" style="float:right">Забыл пароль</button>
					</form>
				</div>
				<div class="card__footer"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import { reactive, ref } from 'vue'

	const router = useRouter()
	const store = useStore()
	const btnSubmit = ref(null)
	const adminValue = reactive({ email: '', password: '' })

	if (store.getters['auth/getIsAuth']) {
		router.push('/dashboard/add')
	}

	const handleSubmit = async () => {
		btnSubmit.value.disabled = true
		btnSubmit.value.dataset.loading = true

		if (await store.dispatch('auth/adminLogin', adminValue)) {
			router.push('/dashboard/add-v2')
			store.commit('removeMessages')
		}

		btnSubmit.value.disabled = false
		delete btnSubmit.value.dataset.loading
	}

	const kekw = () => alert('Забыл пароль? ОТ АДМИНКИ? Грац!... *4numbers-x2')
</script>

<style lang="scss" scoped>
	.card {
		margin-top: 5em;

		&__wrap {
			background-color: transparent;
			border: 0;
			padding: 0;
			box-shadow: none;
		}
	}
	.form {
		&__group {margin-bottom: 2em;}
		&__input {
			min-height: 3em;
			font-size: 1.4em;
			padding: 0 20px;
		}
	}
</style>
