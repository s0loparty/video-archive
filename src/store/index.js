import { createStore } from 'vuex'

import dataVideos from '@/data/videos.json'
import history from './modules/history'
import auth from './modules/auth'

export default createStore({
	state: {
		videos: dataVideos,
		categories: [
			{id: 1, title: 'Ted Ed'},
			{id: 2, title: 'School of Life'},
			{id: 1337, title: 'Другие'},
		],
		messages: [],
		currentCategory: 0,
		mobileMenu: false,
		autoPlay: false,
		autoNext: true,
	},
	getters: {
		getVideos(state) {
			return [...state.videos].reverse()
		},
		getCategories(state) {
			return state.categories
		},
		getMessages(state) {
			return state.messages
		},
		getCurrentCategory(state) {
			return state.currentCategory
		},
		mobileMenu(state) {
			return state.mobileMenu
		},
		autoPlay(state) {
			return state.autoPlay
		},
		autoNext(state) {
			return state.autoNext
		}
	},
	mutations: {
		changeCurrentCategory(state, id) {
			state.currentCategory = id
		},
		pushMessage(state, message = {}) {
			message.time = new Date()
			state.messages.push(message)

			setTimeout(() => state.messages.shift(), 10000)
		},
		toggleMobileMenu(state) {
			state.mobileMenu = !state.mobileMenu
		},
		toggleAutoPlay(state) {
			state.autoPlay = !state.autoPlay
		},
		toggleAutoNext(state) {
			state.autoNext = !state.autoNext
		}
	},
	actions: {},
	modules: {
		history,
		auth
	}
})
