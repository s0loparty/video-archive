<template>
	<main class="page">
		<div class="container">
			<div class="page__header">
				<div class="page__title">
					Все ролики
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
			
			<VideoList :videos="videos" :current-category="currentCategory" class="video--mb"></VideoList>
		</div>
	</main>
</template>

<script setup>
	import { useStore } from 'vuex'

	import Multiselect from '@vueform/multiselect'
	import { computed, ref } from '@vue/reactivity'

	import VideoList from '../components/VideoList.vue'

	const store = useStore()
	const categories = store.getters.getCategories
	const videos = store.getters.getVideos

	const currentCategory = ref(0)
	const categoryName = computed(() => !currentCategory.value ? 0 : categories.find(i => i.id === currentCategory.value).title)
</script>


<style src="@vueform/multiselect/themes/default.css"></style>
