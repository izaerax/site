<template lang="pug">
div 
  span.green {{user}}@server1-uk1
  span :
  span.blue {{ path }}
  span $ 
  slot
</template>

<script setup>
const user = useUserState()
const p = usePathState()
const path = computed(() => (p.value) ? p.value : '~')
</script>

<style lang="scss" scoped>
.blue {
  color: $text-directory-color;
}
.green {
  color: $text-secondary-color;
}
</style>