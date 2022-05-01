<template lang="pug">
.help
  div 
    | GNU bash, version 5.1.4(1)-release (x86_64-pc-linux-gnu)<br>
    | These shell commands are defined internally.  Type `help` to see this list.<br>
    | Type `help name` to find out more about the function `name`.<br><br>
    | A star (*) next to a name means that the command is disabled.<br><br>
  .command-list
    .row
      .command(v-for="index of firstRow" :key="index") {{ index }}
    .row
      .command(v-for="index of secondRow" :key="index") {{ index }}
</template>

<script lang="ts" setup>
import {commandList} from '~/assets/data/commands.ts'
const firstRow = commandList.slice(0, commandList.length / 2)
const secondRow = commandList.slice(commandList.length / 2, commandList.length)
</script>

<style lang="scss" scoped>
.command-list {
  display: flex;
  flex-direction: row;
  .row {
    width: 50%;
    flex-grow: 1;
  }
}
</style>