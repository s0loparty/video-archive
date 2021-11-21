import {
	createStore
} from 'vuex'

import dataVideos from '@/data/videos.json'
export default createStore({
	state: {
		videos: dataVideos,
		categories: [
			{id: 1, title: 'Ted Ed'},
			{id: 2, title: 'School of Life'},
			{id: 3, title: 'JW'},
		],
		currentCategory: 0
	},
	getters: {
		getCategories(state) {
			return state.categories
		},
		getVideos(state) {
			return state.videos
		},
		getCurrentCategory(state) {
			return state.currentCategory
		}
	},
	mutations: {
		changeCurrentCategory(state, id) {
			state.currentCategory = id
		}
	},
	actions: {},
	modules: {}
})
