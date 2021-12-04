<template>
	<main class="main">
		<div class="container">
			<div class="main__header">
				<h2 class="main__title">
					Все ролики
					<span v-if="categoryName">({{ categoryName }})</span>
				</h2>
				<div class="main__category">
					<Multiselect
						v-model="currentCategory"
						label="title"
						mode="single"
						valueProp="id"
						:options="categories"
						placeholder="Выберать категорию"
					/>
				</div>
			</div>
			
			<VideoList :current-category="currentCategory"></VideoList>
		</div>
	</main>
</template>

<script>
import { useStore } from 'vuex'

import Multiselect from '@vueform/multiselect'
import { computed, ref } from '@vue/reactivity'

import VideoList from '../components/VideoList.vue'

export default {
	setup() {
		const store = useStore()
		const categories = store.getters.getCategories

		const currentCategory = ref(0)
		const categoryName = computed(() => !currentCategory.value ? 0 : categories.find(i => i.id === currentCategory.value).title)

		return { categories, currentCategory, categoryName }
	},
	components: { Multiselect, VideoList }
}
</script>


<style src="@vueform/multiselect/themes/default.css"></style>