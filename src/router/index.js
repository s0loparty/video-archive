import { createRouter, createWebHashHistory } from 'vue-router'
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
		meta: { title: 'Добавить видео' }
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('../views/dashboard/Dashboard.vue'),
		redirect: '/dashboard/auth',
		children: [
			{
				path: 'auth',
				meta: { title: 'Админка - Авторизация' },
				name: 'dashboard-auth',
				component: () => import('../views/dashboard/Auth.vue'),
			},
			{
				path: 'add',
				meta: { 
					title: 'Админка - Добавить видео',
					auth: true
				},
				component: () => import('../views/VideoAddFirebase.vue'),
			}
		]
	},
	{ 
		path: '/:pathMatch(.*)*', 
		name: 'NotFound', 
		component: () => import('../views/404.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes,

	// https://next.router.vuejs.org/guide/advanced/scroll-behavior.html#scroll-behavior
	scrollBehavior(to, from, savedPosition) {
		const obj = { behavior: 'smooth', top: 0 }
		return savedPosition ?? obj
	}
})

router.beforeEach((to, from, next) => {
	// SET TITLE
	if (to.meta.title) {
		document.title = to.meta.title
	}

	// MOBILE MENU
	if (store.getters.mobileMenu) {
		store.commit('toggleMobileMenu')
	}

	// AUTH
	if(to.matched.some(record => record.meta.auth)) {
		if (store.getters.auth) {
			return next()
		}
		return next('/dashboard/auth')
	}

	// VIEW VIDEO
	if (to.name === 'video-page') {
		const videos = store.getters.getVideos
		const pageID = +to.params.id
		
		if (!videos.some(v => v.id === pageID)) return next('/404')
		
		document.title = store.getters.getVideos.find(v => v.id === pageID).title

		store.commit('history/addIdInHistory', pageID)
		store.commit('history/updateStorage')
	}

	next()
})


export default router
