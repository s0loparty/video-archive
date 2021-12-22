import axios from "axios"
import { error } from "../../helpers/error"

const TOKEN_KEY = 'jwt-token'

export default {
	namespaced: true,
	
	state: {
		token: localStorage.getItem(TOKEN_KEY),
	},
	getters: {
		getToken(state) {
			return state.token
		},
		getIsAuth(_, getters) {
			return !!getters.getToken
		}
	},
	mutations: {
		setToken(state, token) {
			state.token = token
			localStorage.setItem(TOKEN_KEY, token)
		},
		logout(state) {
			state.token = null
			localStorage.removeItem(TOKEN_KEY)
		}
	},
	actions: {
		async adminLogin({ commit, getters }, adminValue) {
			try {
				const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
				const { data } = await axios.post(url, {...adminValue, returnSecureToken: true})

				commit('setToken', data.idToken)

				console.log('data: ', data)
			} catch (e) {
				console.warn(e.response.data.error.message);
				commit('pushMessage', { text: error(e.response.data.error.message), type: 'danger' }, { root: true })
			} finally {
				return getters.getIsAuth
			}
		}
	}
}
