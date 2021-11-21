<template>
	<header class="header">
		<div class="header__search">
			<input 
				@input="inputSearchQuery"
				:value="searchQuery"
				type="text" 
				class="header__search-input" 
				placeholder="Поиск"
			>
			<button 
				@click.prevent="searchQuery = ''" 
				v-show="searchQuery.length" 
				class="header__search-clear"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6a6a6a" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
				</svg>
			</button>
		</div>

		<div class="header__search-result" v-show="searchResults.length">
			<router-link 
				v-for="result in searchResults" :key="result.googleId"
				:to="'/video/' + result.googleId" 
				@click="clickOnResultLink"
				class="search__result-item"
			>{{ result.title }} <span v-if="result.categoryId">[{{ categories.find(i => i.id === result.categoryId).title }}]</span></router-link>
		</div>
	</header>
</template>

<script>
import { useStore } from 'vuex'
import { watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'

export default {
	setup() {
		const store = useStore()
		const categories = store.getters.getCategories

		const SEARCH_MIN_LENGTH = 1
		const videos = store.getters.getVideos
		const searchQuery = ref('')
		const searchResults = ref([])
		
		watch(searchQuery, (newValue, oldValue) => {
			if (newValue.length >= SEARCH_MIN_LENGTH) {
				searchResults.value = videos
					.filter(video => video.title
						.toLowerCase()
						.indexOf(searchQuery.value.toLowerCase()) !== -1)
			}
			else {
				searchResults.value = []
			}
		})
		// если делать через v-model
		// то на мобилке не покажется результат пока не нажмешь пробел
		const inputSearchQuery = e => searchQuery.value = e.target.value
		const clickOnResultLink = () => {
			searchResults.value = []
			searchQuery.value = ''
		}
		return { searchQuery, searchResults, clickOnResultLink, inputSearchQuery, categories }
	},
}
</script>

<style lang="scss" scoped>
.header__search-clear {
	box-sizing: border-box;
	padding: 5px 10px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	border: 1px solid #bfbfbf;
	margin-left: 10px;
	cursor: pointer;
}
.header__search-result {
	position: absolute;
	background: #2a2a2a;
	display: flex;
	flex-direction: column;
	top: var(--header-h);
	width: 100%;
	padding: 20px;

	& > a {
		color: var(--color-white);
		font-size: 16px;
		margin-bottom: 10px;
		text-decoration: none;
		padding: 5px 0;

		&:last-child {margin-bottom: 0;}
		&:hover {color: var(--color-secondary)}
	}
}
</style>
