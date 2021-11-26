import {
	createRouter,
	// createWebHistory
	createWebHashHistory
} from 'vue-router'

import store from '../store'

const routes = [
	{
		path: '/',
		name: 'main',
		component: () => import('../views/MainPage.vue'),
		meta: {
			title: 'Видео архив'
		}
	},
	{
		path: '/video/:id',
		name: 'video-page',
		component: () => import('../views/VideoPage.vue'),
		meta: {
			title: 'Video page'
		}
	},
	{
		path: '/history',
		name: 'video-history',
		component: () => import('../views/HistoryPage.vue'),
		meta: {
			title: 'История просмотров'
		}
	},
	{
		path: '/video-add',
		name: 'video-add',
		component: () => import('../views/VideoAddFirebase.vue'),
		meta: {
			title: 'Добавить видео'
		}
	}
]

const router = createRouter({
	// base: './dist/',
	// history: createWebHistory(process.env.BASE_URL),
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

router.afterEach(to => {
	if (to.meta.title) {
		document.title = to.meta.title
	}

	if (to.name === 'video-page') {
		document.title = store.getters.getVideos.find(i => i.googleId === to.params.id)?.title ?? 'Смотреть видео'
	}
})

export default router
