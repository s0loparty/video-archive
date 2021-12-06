export default {
	namespaced: true,
	
	state: {
		history: JSON.parse(localStorage.getItem('history') ?? '[]')
	},
	getters: {
		getHistory(state) {
			return state.history
		}
	},
	mutations: {
		addIdInHistory(state, id) {
			if (state.history.some(i => i == id)) return
			state.history.push(parseInt(id))
		},
		updateStorage(state) {
			localStorage.setItem('history', JSON.stringify(state.history))
		}
	}
}
