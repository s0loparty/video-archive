<template>
	<div class="video-page">
		<div class="video-page__content">
			<div class="video-page__player-wrap">
				<iframe :src="video.source" frameborder="0" class="video-page__player"></iframe>
			</div>
			<div class="video-page__info">
				<div class="video-page__title">{{ video.title }}</div>
			</div>
			<div class="video-page__share">
				<ul>
					<li>00000001</li>
					<li>00000002</li>
					<li>00000003</li>
					<li>00000004</li>
				</ul>
			</div>
		</div>
		<div class="video-page__history">
			<p>итория просмотров</p>
			<hr>
			<VideoItem v-for="item in 7" :key="item" :id="item" :title="`[${item}] Lorem ipsum dolor sit.`"></VideoItem>
		</div>
	</div>
</template>

<script>
import { useRoute } from "vue-router"
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import VideoItem from "../components/VideoItem.vue"

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const video = computed(() => store.getters.getVideos.find(i => i.googleId === route.params.id))

		if (!video) {
			return console.log('============== Video not found ==============');
		}

		return { video }
	},
	components: { VideoItem }
}
</script>


<style lang="scss" scoped>
.video-page {
	// display: flex;
	// justify-content: space-between;
	display: grid;
	grid-template-columns: auto 260px;
	grid-column-gap: 20px;

	&__content {
		// width: 70%;
	}
	&__player-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		// max-width: 640px;
		// height: 360px;
		max-height: 70vh;
		height: 100%;
		position: relative;
		background-color: var(--color-secondary);
		border-radius: 4px;
		overflow: hidden;
		z-index: 5;
		&:after {
			position: absolute;
			top: 50%;
			left: 50%;
			content: 'Загрузка...';
			transform: translateX(-50%);
			z-index: -1;
		}
	}
	&__player {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	&__info {
		margin: 20px 0;
	}
	&__title {
		font-size: 18px;
		font-weight: bold;
	}
	&__share {
		margin: 20px 0;
	}
	&__history {
		// width: 25%;
		// background-color: var(--color-secondary);
		height: 600px;
		overflow: auto;

		& > a {
			margin-bottom: 20px;
			&:last-child {margin-bottom: 0;}
		}
	}
}
</style>
