<template>
	<div class="container">
		<div v-if="!isLoading" class="vpage">
			<div :class="['vpage__wrap', { 'vpage__wrap--col-3': similarVIdeos.length }]">
				<div class="vpage__content">
					<div class="vpage__player-wrap" :style="`background-image: url(${video.preview});`">
						<video id="player" playsinline controls>
							<source :src="video.source" type="video/mp4" />
						</video>
					</div>
					<div class="vpage__info">
						<h2 class="vpage__title">{{ video.title }}</h2>
						<small>{{ categoryName }}</small>

						<div class="vpage__share">
							<BaseShareLink :share-link="shareLink" />
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
				
				<div v-if="similarVIdeos.length" class="vpage__history vpage__similars">
					<h3 class="vpage__history-title">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
							<path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
						</svg>
						<span>Похожие ролики</span>
					</h3>
					<div class="vpage__history-container">
						<VideoList :videos="similarVIdeos"></VideoList>
					</div>
				</div>
			</div>
		</div>
		<div v-else>Loading ...</div>
	</div>
</template>

<script setup>
	import { computed, ref, onMounted, watch } from "vue"
	import { useRouter } from "vue-router"
	import { useStore } from 'vuex'

	import Plyr from 'plyr'

	import BaseShareLink from '@/components/BaseShareLink'
	import VideoList from "../components/VideoList.vue"

	const store = useStore()
	const router = useRouter()
	const allVideos = computed(() => store.getters['fetchVideos/getVideos'])

	const video = ref(null)
	// const video = computed(() => store.getters.getVideos.find(v => v.id === +router.currentRoute.value.params.id)) // +route.params.id
	
	const categoryName = ref(null)
	const plyrObj = ref(null)
	const shareLink = computed(() => location.origin + router.currentRoute.value.path) // eoute.path
	const isLoading = ref(true)

	// const allVideos = store.getters.getVideos
	// const allVideos = store.getters['fetchVideos/requestVideos']
	const history = store.getters['history/getHistory']

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

	watch(allVideos, (n, _) => {
		console.log(n)
		video.value = allVideos.value.find(v => v.id === +router.currentRoute.value.params.id)
		categoryName.value = store.getters.getCategories.find(c => c.id === video.value.categoryId).title

		isLoading.value = false

		initPlyr()
		plyrObj.value.on('ended', goNextVideo)
	})

/*
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

	onMounted(async () => {
		allVideos.value = store.getters['fetchVideos/getVideos']
		video.value = computed(() => allVideos.value.find(v => v.id === +router.currentRoute.value.params.id))
		categoryName.value = computed(() => store.getters.getCategories.find(c => c.id === video.value.categoryId).title)
		isLoading.value = false

		initPlyr()
		plyrObj.value.on('ended', goNextVideo)
	})

	const goNextVideo = () => {
		let item = document.querySelector(`.video__item[data-id="${nextVideo.value.id}"]`)

		if (!item) {
			const _temp_item = similarVIdeos.value.concat(historyVideos.filter(i => {
				return video.value.id !== i.id && similarVIdeos.value.indexOf(i) < 0
			}))[0]

			item = document.querySelector(`.video__item[data-id="${_temp_item.id}"]`)
			
			if (!_temp_item) return console.log('_temp_item is empty');
		}

		item.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		})

		const progress = document.createElement('div')
		progress.classList.add('video__next-progress')
		progress.setAttribute('style', 'width: 0%')
		item.append(progress)
		
		const intervalProgress = setInterval(() => {
			progress.style.width = +progress.style.width.slice(0, -1) + 1 + '%'
		}, 100)
		

		setTimeout(() => {
			clearInterval(intervalProgress)
			progress.remove()
			router.push('/video/' + item.dataset.id)
		}, 10500)
	}

	watch(video, (newVideoValue, _) => {
		if (newVideoValue) {
			plyrObj.value.destroy()
			initPlyr(newVideoValue)

			plyrObj.value.on('ended', goNextVideo)
		}
	})

	const historyVideos = (history.map(item => allVideos.value.find(v => v.id === item))).reverse()
	const similarVIdeos = computed(() => {
		return allVideos.value.filter(
		v => v.title.indexOf(video.value.title.split(' ')[0]) !== -1
		&& v.id !== video.value.id)
	})


	// доработать логику
	// сделать включение и отключение авто-некст ролик
	const nextVideo = computed(() => allVideos.value.filter(v => !history.includes(v.id))[0])
*/
</script>

<script scoped>
	import 'plyr/dist/plyr.css'
</script>
