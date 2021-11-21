<template>
	<div class="video">
		<h2 class="video__header-title">
			Все видео <span v-show="currentCategory">({{ categories.find(i => i.id === currentCategory)?.title }})</span>
		</h2>
		<div class="video__list">
			<VideoItem 
				v-for="video in videos" 
				:key="video.id" 
				:id="video.googleId" 
				:title="video.title"
				:preview="video.preview"
			></VideoItem>
			<p v-if="videos.length == 0">Нет роликов в этой категории</p>
		</div>
	</div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

import VideoItem from "./VideoItem.vue";

export default {
	setup() {
		const store = useStore()
		const categories = store.getters.getCategories
		const currentCategory = computed(() => store.getters.getCurrentCategory)
		const allVideos = computed(() => store.getters.getVideos)

		const videos = computed(() => currentCategory.value === 0 
			? allVideos.value
			: allVideos.value.filter(i => i.categoryId === currentCategory.value))


		return { currentCategory, categories, videos: computed(() => videos.value.reverse()) }
	},
	components: { VideoItem }
}
</script>
