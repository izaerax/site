<template lang="pug">
.container
	.row
		UITemporizedText.text-center(
			:ref="setRef(0)" 
			text='0 ciao mondociao mondociao mondociao mondociao mondociao mondociao mondo' 
			:interval="50" @finished="nextTempText"
		)
		UITemporizedText.text-center(
			:ref="setRef(1)" 
			:text="enMessages.index.welcome"
			:interval="50" @finished="nextTempText"
		)
</template>

<script lang="ts" setup>
import useTemporizedTexts from '/composables/useTemporizedTexts.ts'
import enMessages from '/i18n/en'

const {setRef, nextTempText} = useTemporizedTexts()

onMounted(() => nextTempText())

</script>

<style lang="scss" scoped>
</style>