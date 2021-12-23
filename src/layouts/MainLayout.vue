<template>
	<TheHeader></TheHeader>
	<router-view></router-view>
	<TheToggleTheme></TheToggleTheme>
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue';
import TheToggleTheme from '../components/TheToggleTheme.vue';
</script>
