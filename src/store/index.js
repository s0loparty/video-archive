import { createStore, createLogger } from 'vuex'

import dataVideos from '@/data/videos.json'
import history from './modules/history'
import auth from './modules/auth'
import fetchVideos from './modules/videos'

const plugins = []

if (process.env.NODE_ENV === 'development') {
	plugins.push(createLogger())
}

export default createStore({
	plugins,
	state: {
		videos: dataVideos,
		categories: [
			{id: 1, title: 'Ted Ed'},
			{id: 2, title: 'School of Life'},
			{id: 1337, title: 'Другие'},
		],
		messages: [],
		messageTimeout: 15000,
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
		getMessageTimeout(state) {
			return state.messageTimeout
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
		removeMessages(state) {
			state.messages = []
		},
		addOneMessage(state, message) {
			state.messages.push(message)
		},
		removeOneMessage(state, id) {
			state.messages.splice(id, 1)
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
	actions: {
		pushMessage({ commit, getters }, message = {}) {
			const time = new Date().toLocaleTimeString()
			message.time = time
			commit('addOneMessage', message)

			setTimeout(() => {
				commit('removeOneMessage', getters.getMessages.findIndex(m => m.time === time))
			}, getters.getMessageTimeout)
		}
	},
	modules: {
		history,
		auth,
		fetchVideos
	}
})
