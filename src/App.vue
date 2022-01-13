<template>
	<component :is="layoutString" v-if="layoutString" />

	<TheToggleTheme></TheToggleTheme>
	<TheMessage></TheMessage>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";

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
		onMounted(() => store.dispatch('fetchVideos/requestVideos'))

		return { layoutString }
	},
	components: { 
		MainLayout, AuthLayout, DashboardLayout, 
		TheToggleTheme, TheMessage 
	}
}
</script>
