import { createStore } from 'vuex'

import dataVideos from '@/data/videos.json'
import history from './modules/history'

export default createStore({
	state: {
		videos: dataVideos,
		categories: [
			{id: 1, title: 'Ted Ed'},
			{id: 2, title: 'School of Life'},
			{id: 3, title: 'JW'},
		],
		currentCategory: 0,
		mobileMenu: false,
		autoPlay: false,
		autoNext: true,
	},
	getters: {
		getCategories(state) {
			return state.categories
		},
		getVideos(state) {
			return [...state.videos].reverse()
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
		history
	}
})
