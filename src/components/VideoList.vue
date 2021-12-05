<template>
	<div class="video">
		<div v-if="!filtredVideos.length">
			<p class="mess-no-videos">¯\_(ツ)_/¯ <br>Нет роликов</p>
		</div>
		<div v-else class="video__list">
			<video-item 
				v-for="video in filtredVideos" 
				:key="video.id" 
				:id="video.id" 
				:preview="video.preview"
				:title="video.title"
			></video-item>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import VideoItem from '../components/VideoItem.vue'

export default {
	props: {
		currentCategory: {
			type: Number,
			required: false,
			default: 0
		}
	},
	setup(props) {
		const store = useStore()
		const videos = store.getters.getVideos

		const filtredVideos = computed(() => props.currentCategory 
			? videos.filter(i => i.categoryId === props.currentCategory) 
			: videos
		)

		return { filtredVideos: filtredVideos.value.reverse() }
	},
	components: { VideoItem }
}
</script>

<style lang="scss" scoped>
	.mess-no-videos {
		text-align: center;
		font-size: 26px;
		line-height: 40px;
		color: #6c6c6c;
		margin: 0;
		padding: 50px;
	}
</style>