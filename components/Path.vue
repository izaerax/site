<template lang="pug">
div 
  span.green {{user}}@server1-uk1
  span :
  span.blue {{ path }}
  span $ 
  slot
</template>

<script setup>
const props = defineProps({
  path: String,
  user: String
})
</script>

<style lang="scss" scoped>
.blue {
  color: $text-directory-color;
}
.green {
  color: $text-secondary-color;
}
</style>