<template>
	<the-header></the-header>
	<router-view></router-view>
	<TheToggleTheme></TheToggleTheme>
	<TheMessage></TheMessage>

	<!-- <TheSwitcher></TheSwitcher> -->
</template>

<script setup>
	import TheHeader from "@/components/TheHeader.vue"
	import TheToggleTheme from "./components/TheToggleTheme.vue";
	import TheMessage from "./components/TheMessage.vue";
	// import TheSwitcher from "@/components/TheSwitcher.vue"
</script>
