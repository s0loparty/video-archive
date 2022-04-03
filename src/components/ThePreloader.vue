<template>
	<div class="preloader">
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="25 25 50 50"
			width="120"
		>
			<circle
				cx="50"
				cy="50"
				r="20"
				fill="none"
				stroke-width="5"
				stroke="#45d6b5"
				stroke-linecap="round"
				stroke-dashoffset="0"
				stroke-dasharray="100 200"
			>
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="rotate"
					from="0 50 50"
					to="360 50 50"
					dur="2.5s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="stroke-dashoffset"
					values="0;-30;-124"
					dur="1.25s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="stroke-dasharray"
					values="0,200;110,200;110,200"
					dur="1.25s"
					repeatCount="indefinite"
				/>
			</circle>
		</svg>
	</div>
</template>

<script setup>
	import { onMounted, onUnmounted } from 'vue'

	onMounted(() => document.body.classList.add('overflow-y'))
	onUnmounted(() => document.body.classList.remove('overflow-y'))
</script>

<style>
.preloader {
	position: fixed;
	z-index: calc(var(--z-sticky) + 10);
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--color-light);

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
