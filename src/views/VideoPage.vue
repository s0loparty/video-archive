<template>
	<div class="video-page">
		<div class="video-page__content">
			<div class="video-page__player-wrap">
				<iframe :src="video.source" frameborder="0" class="video-page__player"></iframe>
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
			<VideoItem v-for="item in 7" :key="item" :id="item" :title="`[${item}] Lorem ipsum dolor sit.`"></VideoItem>
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
