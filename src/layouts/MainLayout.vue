<template>
	<TheHeader></TheHeader>
	<div v-if="allVideos !== null && !allVideos.length">
		<h1>Нет видеороликов</h1>
	</div>
	<div v-else>
		<router-view></router-view>
	</div>
	<TheToggleTheme></TheToggleTheme>
</template>

<script setup>
import { useStore } from 'vuex';
import TheHeader from '../components/TheHeader.vue';
import TheToggleTheme from '../components/TheToggleTheme.vue';

const store = useStore()
const allVideos = store.getters['fetchVideos/getVideos']
</script>
