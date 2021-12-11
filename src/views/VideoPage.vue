<template>
	<div class="container">
		<div class="vpage">
			<div class="vpage__wrap">
				<div class="vpage__content">
					<div class="vpage__player-wrap" :style="`background-image: url(${video.preview});`">
						<!-- <iframe :src="video.source" frameborder="0" allowfullscreen class="vpage__player"></iframe> -->

						<video ref="test" id="player" playsinline controls :data-poster="video.preview">
							<source :src="video.source" type="video/mp4" />
						</video>
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
					<div v-else class="vpage__history-container">
						<VideoList :videos="historyVideos"></VideoList>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref, onMounted } from "vue"
	import { useRoute } from "vue-router"
	import { useStore } from 'vuex'

	import Plyr from 'plyr'

	import BaseShareLink from '@/components/BaseShareLink'
	import VideoList from "../components/VideoList.vue"

	const store = useStore()
	const route = useRoute()
	const video = computed(() => store.getters.getVideos.find(i => i.id === route.params.id))
	const shareLink = computed(() => location.origin + route.path)

	const allVideos = store.getters.getVideos
	const history = store.getters['history/getHistory']

	const videoPlayer = ref(null)
	onMounted(() => {
		videoPlayer.value = new Plyr(document.getElementById('player'), {
			tooltips: { controls: true, seek: true },
			title: video.value.title,
			blankVideo: video.value.source,
			urls: { download: video.value.source },
		})
	})

	const historyVideos = (history.map(item => allVideos.find(v => v.id == item))).reverse()
</script>
