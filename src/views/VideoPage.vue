<template>
	<div class="container">
		<div :class="['vpage', { 'vpage--mb': !similarVIdeos.length }]">
			<div class="vpage__wrap">
				<div class="vpage__content">
					<div class="vpage__player-wrap" :style="`background-image: url(${video.preview});`">
						<video id="player" playsinline controls>
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

			<div v-if="similarVIdeos.length" class="vpage__similar-videos page">
				<div class="page__header">
					<div class="page__title">Похожие ролики</div>
				</div>
				<VideoList :videos="similarVIdeos"></VideoList>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref, onMounted, watch } from "vue"
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

	const plyrObj = ref(null)
	const initPlyr = (videoValue = null) => {
		videoValue = videoValue ?? video.value
		plyrObj.value = new Plyr('#player')
		plyrObj.value.source = {
			type: 'video',
			title: videoValue.title,
			sources: [{ src: videoValue.source, src: videoValue.source }],
			poster: videoValue.preview
		}
	}
	onMounted(initPlyr)
	watch(video, (newVideoValue, o) => {
		if (newVideoValue) {
			plyrObj.value.destroy()
			initPlyr(newVideoValue)
		}
	})

	const historyVideos = (history.map(item => allVideos.find(v => v.id == item))).reverse()
	const similarVIdeos = computed(() => {
		return allVideos.filter(
		v => v.title.indexOf(video.value.title.split(' ')[0]) !== -1
		&& v.id !== video.value.id)
	})
</script>

<script scoped>
	import 'plyr/dist/plyr.css'
</script>
