<template lang="pug">
.console
  Command(v-for="(command, index) in history" :key="index" :fullCommand="command")
</template>

<script lang="ts" setup>
const history = useHistoryState()
</script>

<style lang="scss" scoped>
</style>