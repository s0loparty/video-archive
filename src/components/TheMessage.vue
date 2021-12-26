<template>
	<teleport to="body">
		<div v-if="messages.length">
			<div class="messages">
				<div class="messages__list">
					<div 
						v-for="(mess, idx) in messages" 
						:key="mess.time" 
						:class="['messages__item', mess.type ? `messages__item--${mess.type}` : '']"
						:style="{ 'animation-duration': messageTimeout }"
						@click="store.commit('removeOneMessage', idx)"
					>
						<div v-if="mess.title" class="messages__title">{{ mess.title }}</div>
						<div class="messages__text" v-html="mess.text"></div>
						<div class="messages__progress"></div>
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const messages = computed(() => store.getters.getMessages)
const messageTimeout = (store.getters.getMessageTimeout / 1000) + 's'

// watch(messages, (n, o) => {
// 	console.log(n, o)
// 	const intervalProgress = setInterval(() => {
// 		const target = messages.value[messages.value.length -1]
// 		console.log(target)

// 		target.style.width = +target.style.width.slice(0, -1) - 1 + '%'

// 		if (target.style.width === '0%') {
// 			clearInterval(intervalProgress)
// 		}
// 	}, 100)
// })
</script>

<style lang="scss" scoped>
	.messages {
		position: fixed;
		bottom: calc(var(--space) / 2);
		left: calc(var(--space) / 2);
		max-width: 300px;
		width: 100%;
		
		&__list {
			display: flex;
			flex-direction: column;
		}
		&__item {
			position: relative;
			padding: calc(var(--space) / 4);
			margin-bottom: calc(var(--space) / 4);
			border-radius: var(--rounded);
			background-color: var(--color-secondary);
			color: var(--color-white);
			opacity: 0;
			cursor: pointer;

			animation: message-opacity;
			animation-duration: 0s;
			overflow: hidden;

			&:last-child {margin-bottom: 0;}

			&--danger {background-color: var(--color-danger)}
			&--warn {background-color: var(--color-warning)}
			&--info {background-color: var(--color-info)}
			&--success {background-color: var(--color-primary)}
		}
		&__title {
			font-weight: bold;
			padding-bottom: calc(var(--space) / 4);
			border-bottom: 1px dashed var(--color-gray);
			margin-bottom: calc(var(--space) / 4);
		}
		&__text {}
		&__progress {
			position: absolute;
			width: 100%;
			height: 2px;
			bottom: 0;
			left: 0;
			border-radius: var(--rounded);
			background: #444;
		}
	}

	@keyframes message-opacity {
		5% {opacity: .95}
		95% {opacity: .95}
		100% {opacity: 0}
	}
</style>
