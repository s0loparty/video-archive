<template>
	<div class="container">
		<div class="card card--sm">
			<div class="card__wrap">
				<div class="card__header">
					<h2 class="card__title card__title--center">Авторизация</h2>
				</div>
				<div class="card__body">
					<form class="form" @submit.prevent="submitForm">
						<div class="form__group">
							<div class="form__label">Логин</div>
							<input v-model.trim="admin.login" type="text" class="form__input">
						</div>
						<div class="form__group">
							<div class="form__label">Пароль</div>
							<input v-model.trim="admin.password" type="password" class="form__input">
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
	import { useStore } from 'vuex'
	import { reactive, ref } from 'vue'

	const store = useStore()
	const btnSubmit = ref(null)
	const admin = reactive({
		login: '',
		password: '',
	})

	const submitForm = async () => {
		btnSubmit.value.disabled = true
		btnSubmit.value.dataset.loading = true

		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
		
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: admin.login,
					password: admin.password,
					returnSecureToken: true,
				})
			})
			const data = await response.json()
			
			if (data.error.errors.length) {
				// return alert('code: ' + data.error.code + ' / message: ' + data.error.errors[0].message)
				store.commit('pushMessage', {
					title: 'Error ' + data.error.code, 
					text: data.error.errors[0].message
				})
				btnSubmit.value.disabled = false
				delete btnSubmit.value.dataset.loading
			}
		} catch (error) {
			console.log(error)
		}
	}

	const kekw = () => alert('Забыл пароль? ОТ АДМИНКИ? Грац!...')
</script>

<style lang="scss">
.card {
	&--md {
		max-width: 768px;
		margin: 0 auto;
	}
	&--sm {
		max-width: 576px;
		margin: 0 auto;
	}
	&__wrap {
		box-shadow: 0 1px 0 0 var(--color-light), 0 0 0 1px var(--color-light);
		background-color: var(--color-light);
		padding: calc(var(--space) / 2);
		border-radius: var(--rounded);
	}
	&__header {
		margin-bottom: calc(var(--space) / 2);;
	}
	&__title {
		font-weight: bold;
		margin: 0;
		&--center {text-align: center;}
	}
	&__body { }
	&__footer { }
}

.btn {
	display: inline-block;
	vertical-align: middle;
	position: relative;
	color: var(--color-primary);
	background-color: transparent;
	border-radius: 9999px;
	border: 1px solid var(--color-primary);
	padding: 12px 24px;
	text-decoration: none;
	cursor: pointer;

	&:nth-child(2n) {margin-left: calc(var(--space) / 4)}

	&:hover {
		color: var(--color-white);
		background-color: var(--color-primary);
	}

	&--danger {
		border-color: var(--color-red);
		color: var(--color-red);

		&:hover {
			color: var(--color-white);
			border-color: var(--color-white);
			background-color: var(--color-red);
		}
	}

	&[disabled] {
		border-color: var(--color-gray);
		background-color: var(--color-gray);
		color: var(--color-dark);
		cursor: not-allowed;

		&:hover {
			border-color: var(--color-gray);
			background-color: var(--color-gray);
		}
	}
	&[data-loading] {
		position: relative;
		overflow: hidden;
		
		&:before {
			position: absolute;
			content: 'Wait ...';
			text-align: center;
			z-index: 10;
			background: var(--color-white);
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--color-secondary);
		}
	}
}
</style>
