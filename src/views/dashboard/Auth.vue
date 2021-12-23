<template>
	<div class="container">
		<div class="card card--sm">
			<div class="card__wrap">
				<div class="card__body">
					<form class="form" @submit.prevent="handleSubmit">
						<div class="form__group">
							<input v-model.trim="adminValue.email" type="email" class="form__input" placeholder="Логин">
						</div>
						<div class="form__group">
							<input v-model.trim="adminValue.password" type="password" class="form__input" placeholder="Пароль">
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
			router.push('/dashboard/add')
			store.commit('removeMessages')
		}

		btnSubmit.value.disabled = false
		delete btnSubmit.value.dataset.loading
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
		border-color: var(--color-danger);
		color: var(--color-danger);

		&:hover {
			color: var(--color-white);
			border-color: var(--color-white);
			background-color: var(--color-danger);
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
		background: var(--color-white);
		color: var(--color-white);
		pointer-events: none;
		
		&:before {
			position: absolute;
			content: '';
			text-align: center;
			z-index: 10;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--color-secondary);

			background-image: url('~@/assets/loading.gif');
			background-size: 30px;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
}
</style>

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
