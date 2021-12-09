<template>
	<div class="container">
		<div class="card">
			<h2 style="margin-top: 0;margin-bottom: 20px;">Добавить видео</h2>

			<div class="grid">
				<section>
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
						<div class="form__group form__grid">
							<div>
								<label for="googleId" class="form__label">Категория</label>
								<input :value="categoryName" type="text" id="googleId" class="form__input">
							</div>
							<div>
								<label for="preview" class="form__label">Preview</label>
								<input v-model="video.preview" type="text" id="preview" class="form__input">
							</div>
						</div>
					</form>
				</section>
				<div class="video-info">
					<img :src="video.preview.length ? video.preview : 'https://via.placeholder.com/460x260?text=No+video+preview'"/>
					<video :src="video.source" ref="videoElement" controls autoplay muted></video>
				</div>
			</div>

			<pre>{{ video }}</pre>
			<section id="canvases"></section>
		</div>
	</div>
</template>

<script setup>
	import { reactive, ref, computed } from '@vue/reactivity'
	import { watch } from '@vue/runtime-core'
	import { useStore } from 'vuex'

	const store = useStore()

	const videoElement = ref(null)
	const fbLink = ref('')
	const categories = store.getters.getCategories

	const video = reactive({
		id: null,
		title: '',
		source: '',
		categoryId: null,
		preview: '',
	})

	const categoryName = computed(() => categories.find(i => i.id === video.categoryId)?.title ?? 'unknown')
	

	watch(fbLink, async (newValue, oldVAlue) => {
		if (!~newValue.indexOf('firebasestorage.googleapis.com')) return console.warn('bad url')

		if (newValue != video.source) {
			document.getElementById('canvases').innerHTML = ''
		}
		
		// json data info
		// https://firebase.google.com/docs/reference/js/storage.fullmetadata
		const res = await fetch(newValue.split('?alt')[0])
		const data = await res.json()
		const name = data.name.replaceAll('_', ' ').slice(0, -4)
		
		video.id = data.generation
		video.title = decodeURI(data.contentDisposition).split("*=utf-8''").pop().replaceAll('_', ' ').slice(0, -4)
		video.categoryId = categories.find(i => name.indexOf(i.title) !== -1).id
		video.source = newValue

		videoElement.value.addEventListener('loadeddata', function() {
			const duration = Math.floor(videoElement.value.duration)
			const countPreviews = 30 // кол-во элементов
			const oneTick = Math.floor(duration / countPreviews)

			for (let i = 0; i < countPreviews; i++) {	
				if (videoElement.value.currentTime < duration) {
					setTimeout(() => {
						videoElement.value.currentTime = videoElement.value.currentTime += oneTick

						const item = document.createElement('canvas')
						item.setAttribute('style', 'display:inline-block;border: 1px dashed;border-radius:4px;margin-right:10px;padding:5px;')

						document.getElementById('canvases').append(item)

						const context = item.getContext('2d')
						context.drawImage(videoElement.value, 0, 0, 320, 180)
					}, i * 3000) // i * 3000
				}
			}
		})
	})
</script>

<style lang="scss" scoped>
	.card {
		margin-bottom: 20px;
		border-radius: 4px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		grid-gap: 20px;
	}
	.video-info {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		align-items: center;

		& > * {
			display: block;
			width: 100%;
			border-radius: 4px;
			max-height: 210px;
			min-width: 200px;
			height: 100%;
		}
	}
	#canvases {
		display: flex;
		overflow: auto;
	}
	pre {
		display: block;
		overflow: auto;
		margin: 20px 0;
		background: bisque;
		padding: 10px;
		border-radius: 4px;
	}
</style>
