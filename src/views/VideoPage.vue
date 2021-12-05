<template>
	<div class="container">
		<div class="vpage">
			<div class="vpage__wrap">
				<div class="vpage__content">
					<div class="vpage__player-wrap">
						<iframe :src="video.source" frameborder="0" allowfullscreen class="vpage__player"></iframe>
					</div>
					<div class="vpage__info">
						<h2 class="vpage__title">{{ video.title }}</h2>
					</div>
					<div class="vpage__share">
						<ul>
							<li>00000001</li>
							<li>00000002</li>
							<li>00000003</li>
							<li>00000004</li>
						</ul>
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
import { computed, onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from 'vuex'

// import VideoItem from "../components/VideoItem.vue"

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const video = computed(() => store.getters.getVideos.find(i => i.id === route.params.id))
		// const loading = ref(true)

		if (!video.value) {
			// return console.log('============== Video not found ==============');
			router.push('/')
		}

		// onMounted(async () => {
		// 	try {
		// 		const res = await fetch(video.source.split('?alt').shift())
		// 		const data = await res.json()
		// 		console.log(data)
		// 		loading.value = false
		// 	} catch (error) {
		// 		console.log(error)
		// 	}
		// })

		document.title = video.value.title
		watch(video, (n, o) => n?.title ? document.title = n.title : route.meta.title)

		return { video}
	},
	// components: { VideoItem }
}
</script>