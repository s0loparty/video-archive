<template>
	<TheHeader></TheHeader>
	<TheAside></TheAside>
	<TheMain></TheMain>
</template>

<script>
import TheHeader from "./components/TheHeader.vue"
import TheAside from "./components/TheAside.vue"
import TheMain from "./components/TheMain.vue"

export default {
	components: { TheHeader, TheAside, TheMain }
}
</script>
