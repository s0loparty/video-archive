<template>
	<teleport to="body">
		<div v-if="messages.length">
			<div class="messages">
				<div class="messages__list">
					<div 
						v-for="mess in messages" 
						:key="mess.time" 
						:class="['messages__item', mess.type ? `messages__item--${mess.type}` : '']"
					>
						<div v-if="mess.title" class="messages__title">{{ mess.title }}</div>
						<div class="messages__text" v-html="mess.text"></div>
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
	import { computed } from 'vue'
	import { useStore } from 'vuex';

	const store = useStore()
	const messages = computed(() => store.getters.getMessages)
	const messageType = computed(() => props.type ? `message--${props.type}` : '')
</script>

<style lang="scss">
	.messages {
		position: absolute;
		bottom: calc(var(--space) / 2);
		left: calc(var(--space) / 2);
		max-width: 300px;
		width: 100%;
		
		&__list {
			display: flex;
			flex-direction: column;
		}
		&__item {
			background-color: var(--color-secondary);
			color: var(--color-white);
			padding: calc(var(--space) / 4);
			border-radius: var(--rounded);
			opacity: 0;
			margin-bottom: calc(var(--space) / 4);

			animation: message-opacity;
			animation-duration: 15s;

			&:last-child {margin-bottom: 0;}

			&--danger {background-color: var(--color-danger)}
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
	}

	@keyframes message-opacity {
		5% {opacity: .95}
		95% {opacity: .95}
		100% {opacity: 0}
	}
</style>
