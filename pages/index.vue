<template lang="pug">
.container(ref="root")
	UITemporizedText.text-center(
		:ref="setRef(0)" 
		text='Work in progress' 
		:interval="50" @finished="nextTempText"
	)
	Console
	CommandLine(ref="commandLine")
</template>

<script lang="ts" setup>
import useTemporizedTexts from '/composables/useTemporizedTexts'

const {setRef, nextTempText} = useTemporizedTexts()
const commandLine = ref()
const root = ref()

onMounted(() => {
	nextTempText()
})

const focusInput = () => {
	commandLine.value.focusInput()
}

defineExpose({
	focusInput
})

</script>

<style lang="scss" scoped>
</style>