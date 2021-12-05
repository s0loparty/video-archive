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
	},
	{ 
		path: '/:pathMatch(.*)*', 
		name: 'NotFound', 
		component: () => import('../views/404.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}

	if (to.name === 'video-page') {
		const videos = store.getters.getVideos

		if (!videos.some(v => v.id === to.params.id)) return next('/404')
		
		document.title = store.getters.getVideos.find(i => i.id === to.params.id).title
	}

	next()
})


export default router
