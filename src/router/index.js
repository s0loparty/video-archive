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
