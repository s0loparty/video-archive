<template>
	<router-link :to="`/video/` + id" class="video__item">
		<div class="video__title">{{ title }}</div>
		<div class="video__preview" :style="`background-image: url(${preview})`"></div>
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
			default: 'https://via.placeholder.com/300x160'
		},
		title: {
			type: String,
			required: true
		}
	})
</script>
