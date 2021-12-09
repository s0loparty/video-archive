<template>
	<div class="container">
		<div class="page__header">
			<div class="page__title">
				История просмотров
				<span v-if="categoryName">({{ categoryName }})</span>
			</div>
			<div class="page__category">
				<Multiselect
					v-model="currentCategory"
					label="title"
					mode="single"
					valueProp="id"
					:options="categories"
					placeholder="Выбрать категорию"
				/>
			</div>
		</div>

		<VideoList :videos="videos" :current-category="currentCategory"></VideoList>
	</div>
</template>

<script setup>
	import { useStore } from 'vuex'
	import { computed, ref } from '@vue/reactivity'

	import VideoList from '../components/VideoList.vue'
	import Multiselect from '@vueform/multiselect'

	const store = useStore()
	const categories = store.getters.getCategories
	const history = store.getters['history/getHistory']
	const allVideos = store.getters.getVideos

	const currentCategory = ref(0)
	const categoryName = computed(() => !currentCategory.value ? 0 : categories.find(i => i.id === currentCategory.value).title)

	const videos = history.map(item => allVideos.find(i => i.id == item)).reverse()
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
