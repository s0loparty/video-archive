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

						<div class="vpage__share">
							<BaseShareLink :share-link="shareLink" />
						</div>
					</div>
				</div>
				<div class="vpage__history">
					<h3 class="vpage__history-title">Итория просмотров</h3>
					<p v-if="!historyVideos.length">История пуста</p>
					<VideoList v-else :videos="historyVideos"></VideoList>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useStore } from 'vuex'

import BaseShareLink from '@/components/BaseShareLink'
import VideoList from "../components/VideoList.vue"

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const video = computed(() => store.getters.getVideos.find(i => i.id === route.params.id))
		const shareLink = computed(() => location.origin + route.path)

		const allVideos = store.getters.getVideos
		const history = store.getters['history/getHistory']

		const historyVideos = history.map(item => allVideos.find(v => v.id == item))

		return { video, shareLink, historyVideos }
	},
	components: { BaseShareLink, VideoList }
}
</script>
