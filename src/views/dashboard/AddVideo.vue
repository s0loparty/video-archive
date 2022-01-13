<template>
	<div class="container">
		<div class="card">
			<div class="card__wrap card__wrap--grid-x2" style="grid-template-columns: 400px 1fr;">
				<div class="card__body">
					<h2>Добавление видео</h2>

					<form @submit.prevent="handlerForm" class="form" id="js_uploadFiles" style="margin-top: 20px">

						<!-- назвние -->
						<div class="form__group">
							<label class="form__label">Название</label>
							<input 
								v-model.trim="videoData.title" 
								:style="inputBorderStyle(videoData.title)"
								type="text" class="form__input form__input--w100"
							>
						</div>

						<!-- категория -->
						<div class="form__group">
							<label class="form__label">Категория</label>
							<select 
								v-model="videoData.categoryId" 
								:style="inputBorderStyle(videoData.categoryId)"
								class="form__input form__input--w100"
							>
								<option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
							</select>
						</div>
						
						<!-- ролик и превью -->
						<div class="form__group-wrap form__group-wrap--grid-x2">
							<!-- выбрать ролик -->
							<div class="form__group form__group--file">
								<label :style="inputBorderStyle(videoData.title)" for="video" class="form__label form__label--w100">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
										<path d="M6 6.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 6.454a.5.5 0 0 0-.757.43z"/>
										<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
									</svg>
									Выбрать ролик</label>
								<input @change="handlerFile($event, VIDEO_TYPE_TITLE)" id="video" type="file" accept="video/*">
							</div>

							<!-- выбрать превью -->
							<div class="form__group form__group--file">
								<label :style="inputBorderStyle(previewUrl)" for="preview" class="form__label form__label--w100">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
										<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
										<path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
									</svg>
									Выбрать превью
								</label>
								<input @change="handlerFile($event, PREVIEW_TYPE_TITLE)" id="preview" type="file" accept="image/*">
							</div>
						</div>

						<div style="display: flex;margin-top: 20px;">
							<button @click="isChecked = !isChecked" type="button" class="btn btn-info">Я всё проверил</button>
							<button :disabled="!isChecked" class="btn btn-success">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
									<path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
								</svg>
								Загрузить
							</button>
						</div>
					</form>
				</div>
				<div class="card__wrap grid grid--x2">
					<div class="card__body">
						<h3>Видео</h3>
						
						<section>
							<video :src="videoData.source" muted controls />
							<div class="video-progress">
								<span v-if="videoUploadProgress !== 100">Progress {{ Math.floor(videoUploadProgress) }} %</span>
								<span>Successfully!</span>
								<div class="video-progress__success" :style="{ 'width':videoUploadProgress + '%' }"></div>
							</div>

							<p style="font-size: .85em;overflow-wrap: break-word;">
								TITLE: {{ videoData.title }} <br><br>
								SIZE: {{ fileSize(inputVideo?.size ?? 0) }} <br><br>
								ID: {{ videoData.id }} <br><br>
								PATH: {{ videoPathInFirebase }}
							</p>
						</section>
					</div>
					<div class="card__body">
						<h3>Превью</h3>

						<img :src="videoData.preview ? videoData.preview : previewUrl" />
						<p style="font-size: .85em;margin-top: 20px;overflow-wrap: break-word;">
							NAME: <span id="img-name"></span> <br><br>
							SIZE: <span id="img-size">0 Б</span> <br><br>
							PATH: <span id="img-path"></span>
						</p>
					</div>
				</div>
			</div>
			<div class="card__wrap" style="margin: 20px 0;">
				<div class="card__body" style="display: flex;gap: 20px;">
					<video 
						id="video-for-previews" 
						src="https://via.placeholder.com/640x160" muted autoplay
						style="border: 1px solid;margin: 0;"
					></video>
					<div id="canvases" style="display: flex;overflow: auto;"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getStorage, ref as StorageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { getDatabase, set as DatabaseSet, ref as DatabaseRef } from 'firebase/database'

import { onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import fileSize from '@/helpers/fileSize'

const db = getDatabase()
const store = useStore()
const categories = store.getters.getCategories
const videoData = reactive({
	id: null,
	title: null,
	source: null,
	categoryId: null,
	preview: null
})

const VIDEO_TYPE_TITLE = 'videos'
const PREVIEW_TYPE_TITLE = 'images'

const isChecked = ref(false)
const videoUploadProgress = ref(0)
const videoPathInFirebase = ref(null)

const previewUrl = ref(null)
const inputVideo = ref(null)
const inputPreview = ref(null)
const handlerFile = (e, type) => {
	const file = e.target.files[0]

	if (!file) return store.dispatch('pushMessage', { text: 'Что-то пошло не так, попробуйте еще раз', type: 'danger' })
	if (type === VIDEO_TYPE_TITLE) {
		inputVideo.value = file		
		videoData.title = file.name.replaceAll('_', ' ')

		document.getElementById('video-for-previews').src = URL.createObjectURL(file)
		document.getElementById('video-for-previews').addEventListener('loadeddata', function() {
			const duration = Math.floor(this.duration)
			const countPreviews = 30 // кол-во элементов
			const oneTick = Math.floor(duration / countPreviews)

			this.play()
			this.width = 640
			this.height = 360

			for (let i = 0; i < countPreviews; i++) {	
				if (this.currentTime < duration) {
					setTimeout(() => {
						const item = document.createElement('canvas')
						item.setAttribute('style', 'display:inline-block;border: 1px dashed;border-radius:4px;margin-right:10px;padding:5px;')
						item.width = this.width
						item.height = this.height

						document.getElementById('canvases').append(item)

						const context = item.getContext('2d')
						context.drawImage(this, 0, 0, this.width, this.height) // 320, 180

						// перемотка
						this.currentTime = this.currentTime += oneTick
					}, i * 3000)
				}
			}

		})
	} 
	else if (type === PREVIEW_TYPE_TITLE) {
		inputPreview.value = file
		previewUrl.value = URL.createObjectURL(file)
		document.querySelector('#img-name').textContent = file.name
		document.querySelector('#img-size').textContent = fileSize(file.size)
	}
}


const disableInputs = (categoryId = 0) => {
	document.querySelectorAll(
		`#js_uploadFiles input[type="text"], 
		#js_uploadFiles .form__group--file label, 
		#js_uploadFiles .form__group--file input`
	).forEach(el => {
		if (!categoryId) {
			el.setAttribute('disabled', '')
		} else {
			el.removeAttribute('disabled')
		}
	})
}
watch(videoData, (n, _) => {
	isChecked.value = false

	disableInputs(n.categoryId)
})
onMounted(disableInputs)


const uploadFile = async fileArgs => {
	const inputFile = fileArgs.type === VIDEO_TYPE_TITLE ? inputVideo.value : inputPreview.value
	const fileContentType = fileArgs.type === VIDEO_TYPE_TITLE ? inputVideo.value.type : inputPreview.value.type
	const categoryName = categories.find(i => i.id === videoData.categoryId)?.title
	
	const storage = getStorage() // ссылка на корень в корзине
	const storageRef = StorageRef(storage, 'uploaded/' + fileArgs.type + '/' + categoryName + '/' + fileArgs.name) // создание ссылки + имя файла

	if (!categoryName && !fileContentType && !inputFile) {
		return alert('Ошибка!')
	}

	const uploadInFirebase = uploadBytesResumable(storageRef, inputFile, {
		contentType: fileContentType,
		cacheControl: 'public,max-age=259200',
		customMetadata: {
			videosOrImages: fileArgs.type
		}
	})

	// listener state and call callback functions
	uploadInFirebase.on('state_changed', 
		(snapshot) => {
			if (snapshot.metadata.customMetadata.videosOrImages === VIDEO_TYPE_TITLE) {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				videoUploadProgress.value = progress
			}
		},
		(error) => {
			console.dir(error)
			store.dispatch('pushMessage', { title: error.code, text: error.message ?? 'unknow error', type: 'danger' })
		}, 
		() => {
			// Upload completed successfully, now we can get the download URL
			getDownloadURL(uploadInFirebase.snapshot.ref).then((downloadURL) => {
				const { generation, fullPath, customMetadata } = uploadInFirebase.snapshot.metadata
				const myMeta = customMetadata.videosOrImages

				// console.log('snapshot: ', uploadInFirebase.snapshot)
				
				if (myMeta === VIDEO_TYPE_TITLE) {
					videoData.source = downloadURL
					videoData.id = +generation
					videoPathInFirebase.value = fullPath

					// insert video data in Realtime Database
					try {
						DatabaseSet(DatabaseRef(db, `video-archive/${videoData.id}`), videoData)
							.then(() => {
								// Data saved successfully!
								store.dispatch('pushMessage', {
									title: 'Database', text: 'Запись в базу добавлена успешно!', type: 'success'
								})
								store.dispatch('fetchVideos/requestVideos')
							})
							.catch((error) => {
								console.dir(error)
								store.dispatch('pushMessage', {
									title: 'Database', text: error.message, type: 'danger'
								})
							})
					} catch (error) {
						store.dispatch('pushMessage', { title: 'Database', text: error.message, type: 'danger' })
						console.dir(error)
					}
				} else if (myMeta === PREVIEW_TYPE_TITLE) {
					videoData.preview = downloadURL
					document.querySelector('#img-path').textContent = fullPath
				} else {alert('Ошибка в методе getDownloadURL')}

				store.dispatch('pushMessage', { 
					text: `Загрузка <b>${myMeta === VIDEO_TYPE_TITLE ? 'видео' : 'превью'}</b> завершена`, 
					type: 'info' 
				})
			})
		}
	)
}

const handlerForm = async () => {
	// типы файлов, всего 2 вида: videos и images
	// они же служат названием папок в корзине
	await uploadFile({ type: PREVIEW_TYPE_TITLE, name: inputPreview.value.name })
	await uploadFile({ type: VIDEO_TYPE_TITLE, name: inputVideo.value.name })
}

const inputBorderStyle = isTrue => {
	return { 
		border: isTrue ? '2px dashed var(--color-primary)' : '2px dashed var(--color-danger)' 
	}
}
</script>

<style lang="scss" scoped>
img, video {
	max-width: 360px;
	max-height: 180px;
	display: block;
	width: 100%;
	object-fit: contain;
	margin: 0 auto;
}

.video-progress {
	position: relative;
	height: calc(var(--space) / 2);
	background-color: var(--color-gray);
	text-align: center;
	z-index: 1;
	border-radius: var(--rounded);
	overflow: hidden;
	margin: 20px 0;
	
	span {
		z-index: 10;
		position: relative;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--color-white);
	}
	&__success {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: 50%;
		height: inherit;
		background-color: var(--color-primary);
		z-index: 5;
		transition: width .4s ease-in;
	}
}

.grid {
	display: grid;
	gap: calc(var(--space) / 2);
	
	&--x2 {
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
}
</style>
