<template lang="pug">
.container
	.row
		TemporizedText.text-center(
			:ref="setRef(0)" 
			text='0 ciao mondociao mondociao mondociao mondociao mondociao mondociao mondo' 
			:interval="50" @finished="nextTempText"
		)
		TemporizedText.text-center(
			:ref="setRef(1)" 
			:text="enMessages.index.welcome"
			:interval="50" @finished="nextTempText"
		)
		Console
		CommandLine(ref="commandLine")
</template>

<script lang="ts" setup>
import useTemporizedTexts from '/composables/useTemporizedTexts'
import enMessages from '/i18n/en'

const {setRef, nextTempText} = useTemporizedTexts()
const commandLine = ref()
onMounted(() => nextTempText())

const focusInput = () => {
	commandLine.value.focusInput()
}

defineExpose({
	focusInput
})

</script>

<style lang="scss" scoped>
</style>