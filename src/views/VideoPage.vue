<template>
	<div class="video-page">
		<div class="video-page__content">
			<div class="video-page__player-wrap">
				<!-- <iframe :src="video.source" frameborder="0" allowfullscreen class="video-page__player"></iframe> -->
				<iframe src="https://firebasestorage.googleapis.com/v0/b/vue-video-archive.appspot.com/o/%D0%A3%D1%80%D0%BE%D0%BA%D0%B8_%D0%9E%D1%81%D0%B2%D0%B5%D0%BD%D1%86%D0%B8%D0%BC%D0%B0_%D1%81%D0%B8%D0%BB%D0%B0_%D0%BD%D0%B0%D1%88%D0%B8%D1%85_%D1%81%D0%BB%D0%BE%D0%B2_Ted_Ed.mp4?alt=media&token=aacd2cf5-ffc1-49e6-93df-c521e2d3b54d" frameborder="0" allowfullscreen class="video-page__player"></iframe>
			</div>
			<div class="video-page__info">
				<div class="video-page__title">{{ video.title }}</div>
			</div>
			<div class="video-page__share">
				<ul>
					<li>00000001</li>
					<li>00000002</li>
					<li>00000003</li>
					<li>00000004</li>
				</ul>
			</div>
		</div>
		<div class="video-page__history">
			<p>итория просмотров</p>
			<hr>
			<VideoItem v-for="item in 7" :key="item" :id="item + 'asd'" :title="`[${item}] Lorem ipsum dolor sit.`"></VideoItem>
		</div>
	</div>
</template>

<script>
import { useRoute } from "vue-router"
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import VideoItem from "../components/VideoItem.vue"

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const video = computed(() => store.getters.getVideos.find(i => i.googleId === route.params.id))

		if (!video) {
			return console.log('============== Video not found ==============');
		}

		return { video }
	},
	components: { VideoItem }
}
</script>
