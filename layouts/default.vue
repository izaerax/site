<template lang="pug">
.layout(v-if="!init" @contextmenu.prevent="pasteInCommandline")
	Header
	slot
.init(v-else) initializing...
</template>

<script setup>
const init = ref(false);
const commandState = useCommandState()

const pasteInCommandline = async () => {
  // todo: find a way to paste in cursor position
  const clip = await navigator.clipboard.readText()
  commandState.value += clip
}

onMounted(() => {
  setTimeout(() => (init.value = false), 3000);
});

</script>

<style lang="scss" scoped>
.layout {
  background-color: $bg-primary-color;
  margin: 0;
  padding: 0;
  height: 100vh;
}
.init {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
