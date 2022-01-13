<template>
	<div class="container">
		<div v-if="!isLoading" class="vpage">
			<!-- <div :class="['vpage__wrap', { 'vpage__wrap--col-3': similarVIdeos.length }]"> -->
			<div :class="['vpage__wrap']">
				<div class="vpage__content">
					<div class="vpage__player-wrap" :style="`background-image: url(${video.preview });`">
						<video id="player" playsinline controls>
							<source :src="video.source" type="video/mp4" />
						</video>
					</div>
					<div class="vpage__info">
						<h2 class="vpage__title">{{ video.title }}</h2>
						<small>{{ categoryName }}</small>

						<div class="vpage__share">
							<!-- <BaseShareLink :share-link="shareLink" /> -->
						</div>
					</div>
				</div>
				<div class="vpage__history">
					<h3 class="vpage__history-title">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
							<path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
							<path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
							<path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
						</svg>
						<span>История просмотров</span>
					</h3>
					<p v-if="!historyVideos.length">История пуста</p>
					<div v-else class="vpage__history-container">
						<VideoList :videos="historyVideos"></VideoList>
					</div>
				</div>
				
				<!-- <div v-if="similarVIdeos.length" class="vpage__history vpage__similars">
					<h3 class="vpage__history-title">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
							<path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
						</svg>
						<span>Похожие ролики</span>
					</h3>
					<div class="vpage__history-container">
						<VideoList :videos="similarVIdeos"></VideoList>
					</div>
				</div> -->
			</div>
		</div>
		<BaseRotateArrows v-else></BaseRotateArrows>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import VideoList from '../components/VideoList.vue'
import BaseRotateArrows from '../components/BaseRotateArrows.vue'

import Plyr from 'plyr'
const plyrObj = ref(null)

const store = useStore()
const router = useRouter()

const isLoading = ref(true)
const pageID = computed(() => +router.currentRoute.value.params.id)

const allVideos = computed(() => store.getters['fetchVideos/getVideos'])
const video = ref(null)
const videoTitle = ref(null)

const allCategories = store.getters.getCategories
const categoryName = ref('Loading ...')

const history = computed(() => store.getters['history/getHistory'])
const historyVideos = ref([])

const initPlyr = videoValue => {
	plyrObj.value = new Plyr('#player')
	plyrObj.value.source = {
		type: 'video',
		title: videoValue.title,
		sources: [{ src: videoValue.source }],
		poster: videoValue.preview
	}
}

const setVideoProperties = (vData = null) => {
	vData = vData ?? video.value
	
	categoryName.value = allCategories.find(i => i.id === vData.categoryId).title
	videoTitle.value = vData.title
	isLoading.value = false

	setTimeout(() => initPlyr(vData), 0)
}

onMounted(() => {
	if (!allVideos.value) {
		watch(allVideos, (newAllVideos, _) => {
			video.value = newAllVideos.find(v => v.id === pageID.value)
			setVideoProperties()
		})
	} else {
		video.value = allVideos.value.find(v => v.id === pageID.value)
		setVideoProperties()
	}
})

// change title
watch(videoTitle, (newTitle, _) => document.title = newTitle)

watch(allVideos, (n, _) => {
	// история выдает ошибку если видео с найденым id не существует
	historyVideos.value = (history.value.map(item => n.find(v => v.id === item))).reverse()
})


// включаем другой ролик
// watch(video, (newVideoValue, _) => {
// 	if (newVideoValue) {
// 		plyrObj.value.destroy()
// 		initPlyr(newVideoValue)

// 		// plyrObj.value.on('ended', goNextVideo)
// 	}
// })
</script>

<script scoped>
	import 'plyr/dist/plyr.css'
</script>
