<template>
	<router-link :to="`/video/` + id" class="video__item" :data-id="id">
		<div class="video__title">{{ title }}</div>
		<div class="video__preview lazy" :data-bg="preview"></div>
	</router-link>
</template>

<script setup>
	defineProps({
		id: {
			type: String,
			required: true
		},
		preview: {
			type: String,
			required: false,
			default: 'https://via.placeholder.com/640x160'
		},
		title: {
			type: String,
			required: true
		}
	})
</script>
