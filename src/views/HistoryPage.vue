<template>
	<div class="container">
		<h1>История просмотров</h1>

		<VideoList :videos="videos"></VideoList>
	</div>
</template>

<script setup>
	import { useStore } from 'vuex'
	import VideoList from '../components/VideoList.vue'

	const store = useStore()
	const history = store.getters['history/getHistory']
	const allVideos = store.getters.getVideos
	const videos = history.map(item => allVideos.find(i => i.id == item))
</script>
