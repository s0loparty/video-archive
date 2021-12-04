<template>
	<header class="header">
		<div class="header__nav">
			<ul class="header__nav-list">
				<li class="header__nav-item">
					<router-link to="/" class="header__nav-link">Все ролики</router-link>
				</li>
				<li class="header__nav-item">
					<router-link to="/history" class="header__nav-link">История просмотров</router-link>
				</li>
			</ul>
		</div>
		<div class="header__search">
			<input v-model="inputQuery" @keydown.esc="searchResults = []" class="header__search-input" type="text" placeholder="Поиск">
			<div v-show="searchResults.length" class="header__search-results">
				<transition-group name="list" @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
					<router-link 
						v-for="res in searchResults" 
						:key="res.id"
						:to="'/video/' + res.id"
						class="header__search-item"
					>
					{{ res.title }}
					</router-link>
				</transition-group>
			</div>
		</div>
		<div @click="toggleMenu" :class="['mobile-nav', {'is-open': isOpen}]">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</header>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useMobileMenu } from '@/composition/mobile-menu.js'

export default {
	setup() {
		const store = useStore()
		const videos = store.getters.getVideos
		const mobileMenu = useMobileMenu()

		const SEARCH_MIN_LENGTH = 1

		const inputQuery = ref('')
		const searchResults = ref([])

		watch(inputQuery, (newValue, _) => {
			if (newValue.length >= SEARCH_MIN_LENGTH) {
				searchResults.value = videos
					.filter(video => video.title
						.toLowerCase()
						.indexOf(inputQuery.value.toLowerCase()) !== -1)
			}
			else {
				searchResults.value = []
			}
		})


		// это конечно классно
		// но в index.html пришлось подключить доп. либу (gsap)
		const beforeEnter = (el) => {
			el.style.opacity = 0
			el.style.height = 0
		}
		const enter = (el, done) => {
			gsap.to(el, { 
				opacity: 1, 
				height: '34px', // 30px
				delay: el.dataset.index * .15,
				onComplete: done
			})
		}
		const leave = (el, done) => {
			gsap.to(el, { 
				opacity: 0, 
				height: 0,
				delay: el.dataset.index * .15,
				onComplete: done
			})
		}

		return { 
			inputQuery, searchResults, 
			beforeEnter, enter, leave, 
			toggleMenu: () => mobileMenu.toggleMenu(),
			isOpen: mobileMenu.isOpen
		}
	}
}
</script>