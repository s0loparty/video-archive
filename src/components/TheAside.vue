<template>
	<aside class="aside">
		<div class="logo">Video archive</div>
		<nav class="nav">
			<ul class="nav__list nav__list--pages">
				<li class="nav__item">
					<a href="#" @click.prevent="changeCategory(0)" class="nav__link">Все ролики</a>
				</li>
				<li class="nav__item">
					<router-link to="/history" class="nav__link">История</router-link>
				</li>
			</ul>
			<ul class="nav__list">
				<li v-for="cat in categories" :key="cat.title" class="nav__item">
					<a href="#" @click.prevent="changeCategory(cat.id)" class="nav__link">{{ cat.title }}</a>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
	setup() {
		const store = useStore()
		const router = useRouter()
		const categories = store.getters.getCategories

		const changeCategory = id => {
			store.commit('changeCurrentCategory', +id)
			router.push('/')
		}
		
		return { categories, changeCategory }
	}
}
</script>
