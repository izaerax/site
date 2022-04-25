<template lang="pug">
.layout(v-if="!init")
	Header
	slot
	Footer
.init(v-else) initializing...
</template>

<script setup>
const init = ref(false);

onMounted(() => {
  setTimeout(() => (init.value = false), 3000);
});
</script>

<style lang="scss" scoped>
.layout {
  background-color: $bg-primary-color;
  margin: 0;
  padding: 0;
  height: calc(100vh - 140px);
}
.init {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
