import { computed } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const titleMain = 'Видео архив'
const titleDashboard = 'Dashboard'

const routes = [
	{
		path: '/',
		name: 'main-page',
		component: () => import('../views/MainPage.vue'),
		meta: { title: titleMain }
	},
	{
		path: '/video/:id',
		name: 'video-page',
		component: () => import('../views/VideoPage.vue'),
		meta: { title: titleMain + ' :: Видео' }
	},
	{
		path: '/history',
		name: 'history-page',
		component: () => import('../views/HistoryPage.vue'),
		meta: { title: titleMain + ' :: История просмотров' }
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('../views/dashboard/Dashboard.vue'),
		redirect: '/dashboard/auth',
		meta: { layout: 'dashboard' },
		children: [
			{
				path: 'auth',
				meta: { 
					title: titleDashboard + ' :: Авторизация',
					layout: 'auth'
				},
				name: 'dashboard-auth',
				component: () => import('../views/dashboard/Auth.vue'),
			},
			{
				path: 'add',
				name: 'dashboard-add',
				meta: { 
					title: titleDashboard + ' :: Добавить видео',
					auth: true,
					layout: 'dashboard'
				},
				component: () => import('../views/dashboard/AddVideoFirebase.vue'),
			},
			{
				path: 'add-v2',
				name: 'dashboard-add-v2',
				meta: { 
					title: titleDashboard + ' :: Добавить видео v2',
					auth: true,
					layout: 'dashboard'
				},
				component: () => import('../views/dashboard/AddVideo.vue'),
			}
		]
	},
	{ 
		path: '/:pathMatch(.*)*', 
		name: 'NotFound',
		meta: { title: titleMain + ' :: 404' },
		component: () => import('../views/404.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,

	// https://next.router.vuejs.org/guide/advanced/scroll-behavior.html#scroll-behavior
	scrollBehavior(to, from, savedPosition) {
		const obj = { behavior: 'smooth', top: 0 }
		return savedPosition ?? obj
	}
})

router.beforeEach((to, from, next) => {
	// MOBILE MENU
	if (store.getters.mobileMenu) {
		store.commit('toggleMobileMenu')
	}

	// AUTH
	if (to.meta.auth && store.getters['auth/getIsAuth']) {
		return next()
	} else if (to.meta.auth && !store.getters['auth/getIsAuth']) {
		return next('/dashboard/auth')
	}
	// if(to.matched.some(record => record.meta.auth)) {
	// 	if (store.getters.getIsAuth) {
	// 		return next()
	// 	}
	// 	return next('/dashboard/auth')
	// }

	// VIEW VIDEO
	if (to.name === 'video-page') {
		// const allVideos = computed(() => store.getters['fetchVideos/getVideos'])
		const pageID = +to.params.id

		// const toVideo = allVideos.value.find(i => i.id === pageID)

		// if (!toVideo) return next('/404')
		
		// document.title = toVideo.title

		store.commit('history/addIdInHistory', pageID)
		store.commit('history/updateStorage')
	} else {
		// SET TITLE
		if (to.meta.title) {
			document.title = to.meta.title
		}
	}

	next()
})


export default router
