<template>
	<router-view></router-view>
</template>

<script setup>
import { getAuth } from 'firebase/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const auth = getAuth()

onMounted(async () => {
	auth.onIdTokenChanged(user => {
		if (router.currentRoute.value.name === 'dashboard-auth') return

		if ( !user || user.accessToken !== store.getters['auth/getToken'] ) {
			store.commit('auth/logout')
			router.push('/dashboard/auth')
			store.dispatch('pushMessage', { text: 'Токен доступа устарел', type: 'warn' })
		} else {
			store.dispatch('pushMessage', { text: 'Авторизация выполнена', type: 'success' })
		}
	})
})
</script>
