<template>
	<header class="header">
		<div :class="['header__nav', { 'is-open': mobileMenu.isOpen.value }]">
			<ul class="header__nav-list">
				<li class="header__nav-item">
					<router-link to="/" class="header__nav-link">Все ролики</router-link>
				</li>
				<li class="header__nav-item">
					<router-link to="/history" class="header__nav-link">История просмотров</router-link>
				</li>
				<li class="header__nav-item">
					<a href="https://t.me/incorlegion" target="_blank" class="header__nav-link header__nav-link--social">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">
							<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
						</svg>
					</a>
				</li>
				<li class="header__nav-item">
					<a href="https://www.youtube.com/c/InCorCadit" target="_blank" class="header__nav-link header__nav-link--social">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">
							<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
						</svg>
					</a>
				</li>
				<li class="header__nav-item">
					<a href="https://github.com/s0loparty/video-archive" target="_blank" class="header__nav-link header__nav-link--social">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
						</svg>
					</a>
				</li>
			</ul>
		</div>
		<div class="header__search">
			<input @input="enterQuery" @focus="0" :value="inputQuery" @keydown.esc="clearSearchResults" class="header__search-input" type="text" placeholder="Поиск">
			<button 
				:class="['header__search-btn-cancel', { 'header__search-btn-cancel--show':inputQuery.length }]"
				@click="clearInputQuery"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
				  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
				  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
				</svg>
			</button>
			<div v-show="searchResults.length" class="header__search-results">
				<transition-group name="list" @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
					<router-link 
						v-for="res in searchResults" 
						:key="res.id"
						:to="'/video/' + res.id"
						class="header__search-item"
						@click="clearInputQuery, clearSearchResults"
					>
					{{ res.title }}
					</router-link>
				</transition-group>
			</div>
		</div>
		<div @click="mobileMenu.toggleMenu" :class="['mobile-nav', { 'is-open': mobileMenu.isOpen.value }]">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</header>
</template>

<script setup>
	import { ref } from '@vue/reactivity'
	import { watch } from '@vue/runtime-core'
	import { useStore } from 'vuex'
	import { useMobileMenu } from '@/composition/mobile-menu.js'

	const store = useStore()
	const videos = store.getters.getVideos
	const mobileMenu = useMobileMenu()

	const SEARCH_MIN_LENGTH = 1

	const inputQuery = ref('')
	const searchResults = ref([])

	const clearSearchResults = () => searchResults.value = []
	const clearInputQuery = () => inputQuery.value = ''

	watch(inputQuery, (newValue, _) => {
		if (newValue.length >= SEARCH_MIN_LENGTH) {
			searchResults.value = videos
				.filter(video => video.title
					.toLowerCase()
					.indexOf(inputQuery.value.toLowerCase()) !== -1)
		}
		else {
			clearSearchResults()
		}
	})

	const enterQuery = e => inputQuery.value = e.target.value

	document.body.addEventListener('click', e => {
		if (!e.target.classList.contains('header__search-results')) {
			clearInputQuery()
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
</script>
