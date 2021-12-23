<template>
	<TheHeader></TheHeader>
	<section>
		<nav>
			<ul>
				<li><router-link to="/dashboard/add">Добавить видео</router-link></li>
				<li><a href="#" @click.prevent="exit">Выход</a></li>
			</ul>
		</nav>

		<router-view></router-view>
	</section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TheHeader from '../components/TheHeader.vue';

const store = useStore()
const router = useRouter()

const exit = () => {
	store.commit('auth/logout')
	router.push('/dashboard/auth')
}
</script>

<style scoped>
section {
	padding-top: var(--space);
}
nav {
	padding: 10px;
	background-color: var(--color-primary);

	position: fixed;
	right: 0;
	left: 0;
	top: var(--header-h);
}
ul {
	display: flex;
	align-items: center;
	justify-content: center;

	list-style: none;
}
ul li {margin-right: 20px;}
ul li:last-child {margin-right: 0;}
ul li a {
	text-decoration: none;
	color: var(--color-white);
	transition: color .4s;
	font-weight: bold;
}
ul li a:hover {color: var(--color-dark)}
</style>
