<template>
	<div class="container">
		<div class="vpage">
			<div class="vpage__wrap">
				<div class="vpage__content">
					<div class="vpage__player-wrap" :style="`background-image: url(${video.preview});`">
						<iframe :src="video.source" frameborder="0" allowfullscreen class="vpage__player"></iframe>
					</div>
					<div class="vpage__info">
						<h2 class="vpage__title">{{ video.title }}</h2>
					</div>
					<div class="vpage__share">
						<BaseShareLink :share-link="shareLink" />
					</div>
				</div>
				<div class="vpage__history">
					<p>итория просмотров</p>
					<hr>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useStore } from 'vuex'

// import VideoItem from "../components/VideoItem.vue"
import BaseShareLink from '@/components/BaseShareLink'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const video = computed(() => store.getters.getVideos.find(i => i.id === route.params.id))
		// const shareLink = computed(() => window.location.href)
		const shareLink = computed(() => location.origin + route.path) 

		return { video, shareLink }
	},
	components: { BaseShareLink /*VideoItem*/ }
}
</script>