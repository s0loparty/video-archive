<template>
	<div class="container">
		<div class="card">
			<h2 style="margin-top: 0;margin-bottom: 20px;">Добавить видео</h2>

			<div style="display: flex;">
				<section style="flex: 0 0 50%">
					<form @submit.prevent="submit" class="form">
						<div class="form__group">
							<label for="googleLink" class="form__label">Ссылка на видео с Firebase</label>
							<input v-model="fbLink" type="text" id="googleLink" class="form__input">
						</div>
						<div class="form__group">
							<label for="title" class="form__label">Название</label>
							<input v-model="video.title" type="text" id="title" class="form__input">
						</div>
						<div class="form__group">
							<label for="source" class="form__label">Прямая ссылка на видео</label>
							<input v-model="video.source" type="text" id="source" class="form__input">
						</div>
						<div class="form__group">
							<label for="googleId" class="form__label">Категория</label>
							<input v-model="video.category" type="text" id="googleId" class="form__input">
						</div>
					</form>
				</section>
				<section style="flex: 1 0 0">
					<video :src="video.source" ref="videoElement" controls autoplay muted></video>
				</section>
			</div>
			<section id="canvases"></section>
		</div>
	</div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
	setup() {
		const store = useStore()

		const videoElement = ref(null)
		const fbLink = ref('')
		const categories = store.getters.getCategories
		
		const video = reactive({
			title: '',
			link: '',
			source: '',
			category: '',
		})
		

		watch(fbLink, async (newValue, oldVAlue) => {
			if (!~newValue.indexOf('firebasestorage.googleapis.com')) return console.warn('bad url')
			
			const res = await fetch(newValue.split('?alt')[0])
			const data = await res.json()
			const arr = data.name.split('/')
			const name = data.name.replaceAll('_', ' ').slice(0, -4)
			
			video.title = decodeURI(data.contentDisposition).split("*=utf-8''").pop().replaceAll('_', ' ').slice(0, -4)
			video.category = categories.find(i => name.indexOf(i.title) !== -1).title
			video.source = newValue.split('&token')[0]

			videoElement.value.addEventListener('loadeddata', function() {
				const duration = Math.floor(videoElement.value.duration)
				const countPreviews = 30 // кол-во элементов
				const oneTick = Math.floor(duration / countPreviews)

				// this.play()
				// https://firebasestorage.googleapis.com/v0/b/vue-video-archive.appspot.com/o/videos%2FTed%20Ed%2F%D0%A3%D1%80%D0%BE%D0%BA%D0%B8_%D0%9E%D1%81%D0%B2%D0%B5%D0%BD%D1%86%D0%B8%D0%BC%D0%B0_%D1%81%D0%B8%D0%BB%D0%B0_%D0%BD%D0%B0%D1%88%D0%B8%D1%85_%D1%81%D0%BB%D0%BE%D0%B2_Ted_Ed.mp4?alt=media&token=497ed25d-5207-4054-891b-98af93c19722

				for (let i = 0; i < countPreviews; i++) {	
					if (videoElement.value.currentTime < duration) {
						setTimeout(() => {
							videoElement.value.currentTime = videoElement.value.currentTime += oneTick

							const item = document.createElement('canvas')
							item.setAttribute('style', 'display:inline-block;border: 1px dashed;border-radius:4px;margin-right:10px;padding:5px;')

							document.getElementById('canvases').append(item)

							const context = item.getContext('2d')
							context.drawImage(videoElement.value, 0, 0, 260, 180)
						}, i * 3000) // i * 3000
					}
				}
			})
		})

		const nextTime = (sec, to) => {
			videoElement.value.currentTime = (to == 'next') 
				? videoElement.value.currentTime += sec 
				: videoElement.value.currentTime -= sec
		}

		return { video, videoElement, nextTime, fbLink }
	},
}
</script>

<style lang="scss" scoped>
#canvases {
	display: flex;
	overflow: auto;
}
video {
	width: 100%;
	height: 320px;
}
.form {
	&__group {margin-bottom: 1rem;}
	&__label {
		display: block;
		margin-bottom: 0.5rem;
	}
	&__input {
		// temp
		width: 90%;

		display: inline-flex;
		box-sizing: border-box;

		background-color: var(--color-white);
		color: #444;
		border: 1px solid #ccc;

		padding: 0 10px;
		min-height: 40px;
		border-radius: 4px;

		transition: all .3s;
		&:focus {
			outline: none;
			border-color: var(--color-secondary);
		}
		&:disabled {
			background-color: var(--body-bg);
			color: var(--color-secondary);
		}
	}
	&__small {
		display: block;
		margin-top: 5px;
	}
}
</style>
