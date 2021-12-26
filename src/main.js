import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseApp = initializeApp({
	apiKey: process.env.VUE_APP_FB_KEY,
	authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
	projectId: process.env.VUE_APP_FB_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FB_MESS_SENDER_ID,
	appId: process.env.VUE_APP_FB_APP_ID
})
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp)

import '@/assets/styles/main.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
