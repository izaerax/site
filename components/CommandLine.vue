<template lang="pug">
form(@submit.prevent="execute")
  input(v-model="command" ref="input" @keydown="browseHistory")
</template>

<script setup>
// data
const commandPointer = ref(-1)
const command = ref('')
const input = ref()
const history = ref([])

const {executeCommand} = useCommandLine()

// methods
const execute = () => {
  if (command.value === '') return

  //save the command in history and clear the input 
  history.value.push(command.value)
  
  executeCommand(command.value)

  command.value = ''

  //reset the command pointer
  commandPointer.value = history.value.length-1
  
  console.log(commandPointer.value, history.value)

}

const browseHistory = (e) => {
  
  switch (e.keyCode) {

    //backspace
    case 8: {
      //reset command pointer
      commandPointer.value = history.value.length-1

    } break
    //arrow up
    case 38: {
      if (commandPointer.value >= 0) {
        command.value = history.value[commandPointer.value]        
        commandPointer.value--
      }
    } break
    
    //arrow down
    case 40: {
      if(commandPointer.value < history.value.length-1) {
      command.value = history.value[commandPointer.value]
      commandPointer.value++
      }
    } break
  }
}

//hooks
onMounted(() => {
  if (input.value) {
    input.value.focus()
  }
})
</script>

<style lang="scss" scoped>
input, textarea {
  color: $text-primary-color;
  background-color: $bg-primary-color;
  width: 100%;
  &:focus, &:hover {
    outline: none;
  }
}
</style>