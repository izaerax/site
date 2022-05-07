<template lang="pug">

.command 
  // todo: find a better way
  Path {{ fullCommand }}
  LazyCommandRenderCd(v-if="command === 'cd'" :args="args")
  LazyCommandRenderLs(v-else-if="command === 'ls'" :args="args")
  LazyCommandRenderHelp(v-else-if="command === 'help'" :args="args")
  div(v-else) -bash: {{ fullCommand }}: command not found 
</template>

<script lang="ts" setup>

const props = defineProps({
  fullCommand: {
    type: String,
    required: true
  }
})

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

We trust you have received the usual lecture from the local System
Administrator. It usually boils down to these three things:

    #1) Respect the privacy of others.
    #2) Think before you type.
    #3) With great power comes great responsibility.

[sudo] password for olti: