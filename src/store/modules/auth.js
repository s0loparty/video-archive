export default {
	namespaced: true,
	
	state: {
		isAuth: false,
	},
	getters: {
		getAuth(state) {
			return state.isAuth
		}
	},
	mutations: {}
}
