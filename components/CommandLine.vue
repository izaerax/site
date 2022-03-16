<template lang="pug">
input(v-model="command")
</template>

<script lang="ts" setup>
const command = ref('CIAO')

</script>

<style lang="scss" scoped>
input {
  color: $text-primary-color;
  background-color: $bg-primary-color;
  width: 100%;
  &:focus, &:hover {
    outline: none;
  }
}
</style>