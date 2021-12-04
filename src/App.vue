<template>
	<the-header></the-header>
	<router-view></router-view>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue"
// import MainPage from "./views/MainPage.vue"

export default {
	components: { TheHeader /*, MainPage*/ }
}
</script>
