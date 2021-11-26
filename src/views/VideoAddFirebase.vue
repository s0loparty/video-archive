<template>
	<div class="container">
		<div class="card">
			<h2 style="margin-top: 0;margin-bottom: 20px;">Добавить видео</h2>

			<div style="display: flex;">
				<section style="flex: 0 0 50%">
					<form @submit.prevent="submit" class="form">
						<div class="form__group">
							<label for="googleLink" class="form__label">Ссылка на видео с Firebase</label>
							<input v-model="video.link" type="text" id="googleLink" class="form__input">
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
					<div style="display: flex;flex-wrap:wrap;justify-content: space-between;">
						<video :src="video.source" ref="videoElement" crossorigin="anonymous" controls autoplay muted></video>
						<canvas ref="canvasElement"></canvas>
					</div>
					<div style="margin-top: 10px;">
						<button @click="nextTime(5, 'back')">На 5 секунд назад</button>
						<button @click="nextTime(5, 'next')">На 5 секунд вперед</button>
					</div>
					<hr>
					<div style="display: flex;flex-wrap:wrap;">
						<img 
							v-for="img in images" 
							:key="img" 
							:src="img" 
							style="width: 100px;height: 100px;margin-bottom: 5px;" 
							crossorigin="anonymous"
						/>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'

export default {
	setup() {
		const canvasElement = ref(null)
		const videoElement = ref(null)
		const images = ref([])
		
		const video = reactive({
			title: '',
			link: '',
			source: '',
			category: '',
		})

		onMounted(() => {
			videoElement.value.style.width = '300px'
			videoElement.value.style.height = '160px'
			canvasElement.value.style.width = '300px'
			canvasElement.value.style.height = '160px'
		})

		watch(video, async (newValue, oldVAlue) => {
			if (!newValue.link) return
			
			const res = await fetch(newValue.link.split('?alt')[0])
			const data = await res.json()
			const arr = data.name.split('/')
			
			video.title = (arr.length === 3 ? arr[2] : arr[1]).replaceAll('_', ' ').slice(0, -4)
			video.category = arr.length === 3 ? arr[1] : 'unknown'
			// video.source = newValue.link.split('&token')[0]
			video.source = newValue.link

			setInterval(() => {
				canvasElement.value.getContext('2d').drawImage(videoElement.value, 0, 0, canvasElement.value.width, canvasElement.value.height)

				let image = new Image();
				setTimeout(() => {
					image.crossOrigin = 'anonymous'
					console.log(canvasElement.value.toDataURL())
				}, 0)
				// const image = canvasElement.value.toDataURL()
				// images.value.push(image)
			}, 5000)

			// https://firebasestorage.googleapis.com/v0/b/vue-video-archive.appspot.com/o/videos%2FTed%20Ed%2F%D0%A3%D1%80%D0%BE%D0%BA%D0%B8_%D0%9E%D1%81%D0%B2%D0%B5%D0%BD%D1%86%D0%B8%D0%BC%D0%B0_%D1%81%D0%B8%D0%BB%D0%B0_%D0%BD%D0%B0%D1%88%D0%B8%D1%85_%D1%81%D0%BB%D0%BE%D0%B2_Ted_Ed.mp4?alt=media&token=497ed25d-5207-4054-891b-98af93c19722
		})

		const nextTime = (sec, to) => {
			videoElement.value.currentTime = (to == 'next') 
				? videoElement.value.currentTime += sec 
				: videoElement.value.currentTime -= sec
		}

		return { video, canvasElement, videoElement, images, nextTime }
	},
}
</script>

<style lang="scss" scoped>
.json-code {
	padding: 5px;
	border-radius: 4px;
	background: bisque;
	white-space: pre-wrap;
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

		padding: 0 5px;
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
