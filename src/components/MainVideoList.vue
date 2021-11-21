<template>
	<div class="video">
		<h2 class="video__header-title">
			All videos <span v-show="currentCategory">({{ categories.find(i => i.id === currentCategory)?.title }})</span>
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
import { watch } from '@vue/runtime-core';

export default {
	setup() {
		const store = useStore()
		const categories = store.getters.getCategories
		const currentCategory = computed(() => store.getters.getCurrentCategory)

		// const videos = currentCategory.value === 0 
		// 	? computed(() => store.getters.getVideos)
		// 	: computed(() => store.getters.getVideos.filter(i => i.categoryId === currentCategory.value))

		const videos = computed(() => currentCategory.value === 0 
			? store.getters.getVideos
			: store.getters.getVideos.filter(i => i.categoryId === currentCategory.value))

		watch(videos, (n, o) => console.log('videos: ', n))


		return { currentCategory, categories, videos }
	},
	components: { VideoItem }
}
</script>
