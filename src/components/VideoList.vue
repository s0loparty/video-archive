<template>
	<div class="video">
		<div v-if="!filtredVideos.length">
			<p class="mess-no-videos">¯\_(ツ)_/¯ <br>Нет роликов</p>
		</div>
		<div v-else :class="['video__list', { 'video__list--max-w': filtredVideos.length <= 5 }]">
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

<script setup>
	import { computed, onUpdated, onMounted, ref } from 'vue'
	import VideoItem from '@/components/VideoItem.vue'

	import LazyLoad from 'vanilla-lazyload'
	const backgroundLazy = ref(null)
	onMounted(() => backgroundLazy.value = new LazyLoad())
	onUpdated(async () => await backgroundLazy.value.update())

	const props = defineProps({
		videos: {
			type: Array,
			required: true,
			default: [],
		},
		currentCategory: {
			type: Number,
			required: false,
			default: 0
		}
	})

	const filtredVideos = computed(() => props.currentCategory 
		? props.videos.filter(v => v.categoryId === props.currentCategory) 
		: props.videos
	)
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
