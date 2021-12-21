<template>
	<div class="container">
		<div class="card card--md">
			<div class="card__wrap">
				<div class="card__header">
					<div class="card__title card__title--center">Авторизация</div>
				</div>
				<div class="card__body">
					<form class="form" @submit.prevent="submitForm">
						<div class="form__group">
							<div class="form__label">Логин</div>
							<input v-model.trim="dataForm.login" type="text" class="form__input">
						</div>
						<div class="form__group">
							<div class="form__label">Пароль</div>
							<input v-model.trim="dataForm.password" type="password" class="form__input">
						</div>
						<button class="btn">Войти</button>
					</form>
				</div>
				<div class="card__footer"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useStore } from 'vuex'
	import { reactive } from 'vue'

	const store = useStore()
	const dataForm = reactive({
		login: '',
		password: '',
	})

	const submitForm = () => {
		console.log('form submited!')
	}
</script>

<style lang="scss">
.card {
	&--md {
		max-width: 768px;
		margin: 0 auto;
	}
	&--md {
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
		font-size: 1.2em;
		font-weight: bold;
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
	display: inline-block;
	width: auto;
	border-radius: 9999px;
	transition: all .15s ease;
	border: 1px solid var(--color-primary);
	padding: 12px 24px;
	text-decoration: none;
	cursor: pointer;

	&:hover {
		color: var(--color-white);
		background-color: var(--color-primary);
	}
}
</style>
