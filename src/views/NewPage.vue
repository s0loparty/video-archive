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
			<input class="header__search-input" type="text" placeholder="Поиск">
		</div>
		<div class="header__nav-mobile">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</header>
	<main class="main">
		<div class="container">
			<div class="main__header">
				<h2 class="main__title">
					Все ролики
					<span v-if="categoryName">({{ categoryName }})</span>
				</h2>
				<div class="main__category">
					<Multiselect
						v-model="currentCategory"
						label="title"
						mode="single"
						valueProp="id"
						:options="categories"
						placeholder="Выберать категорию"
					/>
				</div>
			</div>
			<div class="video">
				<div class="video__list">
					<VideoItem v-for="item in 15" :key="item" :id="'asd-' + item" title="This is video title"></VideoItem>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { useStore } from 'vuex'

import Multiselect from '@vueform/multiselect'
import { computed, ref } from '@vue/reactivity'

import VideoItem from '../components/VideoItem.vue'

export default {
	setup() {
		const store = useStore()
		const categories = store.getters.getCategories

		const currentCategory = ref(0)
		const categoryName = computed(() => !currentCategory.value ? 0 : categories.find(i => i.id === currentCategory.value).title)

		return { categories, currentCategory, categoryName }
	},
	components: { Multiselect, VideoItem }
}
</script>


<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
	$header-h: 70px;
	$space: 40px;

	.multiselect {width: inherit;}
	.multiselect.is-active {box-shadow: none;}
	.multiselect-option.is-selected {background: #4883b7;}
	.multiselect-option.is-selected.is-pointed {background: #3c6d99;}

	body {
		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		padding-top: $header-h + $space / 2;
	}
	a, button {
		transition: .2s ease,color .2s ease,border .2s ease;
	}
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		border: 0;
	}
	.container {
		padding: 0 $space / 2;
	}
	.header {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 70px;
		background-color: #1b1b27;
		
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 0 40px;

		&__nav { }
		&__nav-list {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			align-items: center;
		}
		&__nav-item {
			display: inline-flex;
			&:not(&:last-child) {
				margin-right: 20px;
			}
		}
		&__nav-link {
			color: #a0a0a9;
			line-height: 18px;
			text-decoration: none;
			font-size: 18px;
			&:hover {color:#fff;}
		}
		&__search {
			flex: 1 0 0;
			margin-left: 40px;
		}
		&__search-input {
			min-height: 40px;
			padding: 0 10px;
			border-radius: 2px;
			color: #444;
			width: 100%;
			&:focus {outline: none;}
		}
		&__nav-mobile {
			display: none;
		}
	}

	.main {
		&__header {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: $space / 2;

			margin-bottom: $space / 2;
		}
		&__title {}
		&__category {
			min-width: 200px;
			max-width: 300px;
			width: 100%;
		}
	}
	.video {
		&__list {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			// grid-template-columns: repeat(auto-fit, 280px);
			justify-content: space-between;
			grid-gap: $space / 2;
			
			@media screen and (max-width: 1600px) {
				grid-template-columns: repeat(5, 1fr);
			}
			@media screen and (max-width: 1200px) {
				grid-template-columns: repeat(4, 1fr);
			}
			@media screen and (max-width: 992px) {
				grid-template-columns: repeat(3, 1fr);
			}
			@media screen and (max-width: 768px) {
				grid-template-columns: repeat(2, 1fr);
			}
			@media screen and (max-width: 576px) {
				grid-template-columns: repeat(1, 1fr);
			}
		}
		&__item {
			text-decoration: none;
			border: 1px solid #ccc;
			min-height: 160px;
			border-radius: 4px;
			overflow: hidden;
			position: relative;
			z-index: 5;

			@media screen and (max-width: 576px) {
				min-height: 200px;
			}
		}
		&__title {
			position: absolute;
			content: '';
			bottom: 0;
			left: 0;
			padding: 8px;
			background-color: rgba(0, 0, 0, 0.6);
			color: #fff;
			font-size: 14px;
			width: 100%;
			z-index: 3;
		}
		&__preview {
			position: absolute;
			content: '';
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			background-color: var(--color-secondary);
			background-image: url(https://via.placeholder.com/290x160?text=This+is+video+item);
			transition: all .2s;
			z-index: 1;
			
			transition: transform .4s;
			&:hover {transform: scale(1.15)}
		}
	}
</style>
