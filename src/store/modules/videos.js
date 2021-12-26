import { getDatabase, ref as DatabaseRef, get as DatabaseGet, child } from 'firebase/database'

export default {
	namespaced: true,

	state: {
		videos: null,
	},
	getters: {
		getVideos(state) {
			return state.videos
		}
	},
	mutations: {
		setVideos(state, videos) {
			state.videos = videos
		}
	},
	actions: {
		async requestVideos({ commit }) {
			const dbRef = DatabaseRef(getDatabase())
			DatabaseGet(child(dbRef, `video-archive`))
				.then((snapshot) => {
					console.log('snapshot: ', snapshot)
					if (snapshot.exists()) {
						commit('setVideos', Object.values(snapshot.val()))
					} else {
						console.log("No data available")
					}})
				.catch((error) => console.error(error))
		}
	}
}
