<template>
	<TheHeader></TheHeader>
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
			<div class="video">
				<div class="video__list">
					<VideoItem v-for="item in 15" :key="item" :id="'asd-' + item" title="This is video title"></VideoItem>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { useStore } from 'vuex'

import Multiselect from '@vueform/multiselect'
import { computed, ref } from '@vue/reactivity'

import VideoItem from '../components/VideoItem.vue'
import TheHeader from '../components/TheHeader2.vue'

export default {
	setup() {
		const store = useStore()
		const categories = store.getters.getCategories

		const currentCategory = ref(0)
		const categoryName = computed(() => !currentCategory.value ? 0 : categories.find(i => i.id === currentCategory.value).title)

		return { categories, currentCategory, categoryName }
	},
	components: { Multiselect, VideoItem, TheHeader }
}
</script>


<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
	$header-h: 70px;
	$space: 40px;

	.multiselect {width: inherit;}
	.multiselect.is-active {box-shadow: none;}
	.multiselect-option.is-selected {background: #4883b7;}
	.multiselect-option.is-selected.is-pointed {background: #3c6d99;}

	body {
		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		padding-top: $header-h + $space / 2;
	}
	a, button {
		transition: .2s ease,color .2s ease,border .2s ease;
	}
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		border: 0;
	}
	.container {
		padding: 0 $space / 2;
	}
	
	@import '@/assets/styles/_the-header';

	.main {
		&__header {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: $space / 2;

			margin-bottom: $space / 2;
		}
		&__title {
			color: inherit;
		}
		&__category {
			min-width: 200px;
			max-width: 300px;
			width: 100%;
		}
	}

	@import '@/assets/styles/_video'
</style>
