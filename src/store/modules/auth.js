// import axios from "axios"
import { error } from "../../helpers/error"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

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
		async adminLogin({ commit, dispatch, getters }, adminValue) {
			try {
				const auth = getAuth()
				const responseAuth = await signInWithEmailAndPassword(auth, adminValue.email, adminValue.password)
				commit('setToken', responseAuth?.user?.accessToken)
			} catch (error) {
				console.dir(error)

				dispatch('pushMessage', {
					title: error.code,
					text: error.message, 
					type: 'danger' }, { root: true }
				)
			} finally {
				return getters.getIsAuth
			}


			// signInWithEmailAndPassword(auth, adminValue.email, adminValue.password)
			// 	.then((userCredential) => {
			// 		// Signed in 

			// 		// const user = userCredential.user
			// 		console.log('user: ', user)

			// 		const { accessToken } = userCredential.user
			// 		commit('setToken', accessToken)
			// 	})
			// 	.catch((error) => {
			// 		console.dir(error)

			// 		dispatch('pushMessage', {
			// 			title: error.code,
			// 			text: error.message, 
			// 			type: 'danger' }, { root: true }
			// 		)
			// 	})

			return getters.getIsAuth

			// 	const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
			// 	const { data } = await axios.post(url, {...adminValue, returnSecureToken: true})

			// 	commit('setToken', data.idToken)
			// } catch (e) {
			// 	console.warn(e.response.data.error.message);
			// 	dispatch('pushMessage', { 
			// 		text: error(e.response.data.error.message), 
			// 		type: 'danger' }, { root: true }
			// 	)
			// } finally {
			// 	return getters.getIsAuth
			// }
		}
	}
}
