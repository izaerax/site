<template lang="pug">
.command 
  // todo: find a better way
  Path(:user="user" :path="path") {{ fullCommand }}
  LazyCommandRenderCd(v-if="command === 'cd'" :args="args")
  LazyCommandRenderLs(v-else-if="command === 'ls'" :args="args")
  LazyCommandRenderHelp(v-else-if="command === 'help'" :args="args")
  div(v-else) -bash: {{ fullCommand }}: command not found 
</template>

<script lang="ts" setup>
import { useFilesystemStore } from '~~/stores/filesystemStore';

const props = defineProps({
  fullCommand: {
    type: String,
    required: true
  }
})

const user = useUserState()
const filesystemStore = useFilesystemStore()
const computePath = () => {
  if (filesystemStore.fullpath) return filesystemStore.fullpath
  else return '~'
}
const path = computePath()

const index = props.fullCommand.indexOf(' ')
let command = ''
let args = ''

if (index < 0) {
  command = props.fullCommand
} else {
  command = props.fullCommand.slice(0, index)
  args = props.fullCommand.slice(index + 1)
}

</script>

<style lang="scss">
</style>