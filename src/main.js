import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseApp = initializeApp({
	apiKey: import.meta.env.VITE_FB_KEY,
	authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FB_DATABASE_URL,
	projectId: import.meta.env.VITE_FB_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FB_MESS_SENDER_ID,
	appId: import.meta.env.VITE_FB_APP_ID
})
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp)

import '@/assets/styles/main.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
