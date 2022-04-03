<template>
	<ThePreloader v-if="allVideos === null"></ThePreloader>
	<component v-else :is="layoutString" v-if="layoutString" />
	<!-- <Suspense>
		<component :is="layoutString" v-if="layoutString" />
	</Suspense> -->

	<TheToggleTheme></TheToggleTheme>
	<TheMessage></TheMessage>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";

import ThePreloader from "./components/ThePreloader.vue";
import TheToggleTheme from "./components/TheToggleTheme.vue";
import TheMessage from "./components/TheMessage.vue";

// IN DEV
// import TheSwitcher from "@/components/TheSwitcher.vue"

import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { useStore } from 'vuex';

export default {
	setup() {
		const route = useRoute()
		const layoutString = computed(() => route.meta.layout ? route.meta.layout + '-layout' : 'main-layout')

		const store = useStore()
		const allVideos = computed(() => store.getters['fetchVideos/getVideos'])

		onMounted(async () => await store.dispatch('fetchVideos/requestVideos'))

		return { layoutString, allVideos }
	},
	components: { 
		MainLayout, AuthLayout, DashboardLayout, 
		ThePreloader, TheToggleTheme, TheMessage 
	}
}
</script>
