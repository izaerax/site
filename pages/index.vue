<template lang="pug">
.main
	UITemporizedText(:ref="setRef(1)" text='0 ciao mondociao mondociao mondociao mondociao mondociao mondociao mondo' :interval="50" @finished="nextTempText")
	UITemporizedText(:ref="setRef(0)" text='1 ciao mondociao mondociao mondociao mondociao mondociao mondociao mondo' :interval="50" @finished="nextTempText")
</template>

<script lang="ts" setup>
const temporizedTextsArr = []
let tempCounter = 0

/**
 * Used to create an array 
 * source: https://docs.w3cub.com/vue~3/guide/migration/array-refs
 */
const setRef = index => {
	return (el) => {
		if (el) {
			temporizedTextsArr[index] = el
		}
	}
}

/**
 * Called to render the temporized text in order specified by position in temporizedTextsArr
 */
const nextTempText = () => {
	if (tempCounter < temporizedTextsArr.length) {
		temporizedTextsArr[tempCounter].resume()
		tempCounter++
	}
}

onMounted(() => nextTempText())

</script>

<style lang="scss" scoped>
.main {
    display: flex;
		flex-grow: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 40px);
}
</style>