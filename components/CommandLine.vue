<template lang="pug">
form(@submit.prevent="execute")
  .command 
    Path
    input(
      v-model="command" 
      ref="input" 
      @keydown="browseHistory"
    )
</template>

<script setup>
// data
const commandPointer = ref(-1)
const command = useCommandState()
const history = useHistoryState()
const input = ref()

//---------------------------------------------methods-------------------------------------
/**
 * Perform the execution of the command. 
 */
const execute = () => {
  if (command.value === '') return

  //save the command in history and clear the input 
  //ATTENTION: putting data in history its like executing a command due to vue reactivity.
  history.value.push(command.value)
  command.value = ''

  //reset the command pointer
  commandPointer.value = history.value.length-1

}

const browseHistory = (e) => {
  switch (e.keyCode) {
    //backspace
    case 8: {
      //reset command pointer
      commandPointer.value = history.value.length-1

    } break

    //tab
    case 9: {
      console.log('tab pressed')
      e.preventDefault()
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
        commandPointer.value++
        command.value = history.value[commandPointer.value]
      } else {
        command.value = ''
      }
    } break
  }
}

const focusInput = (e) => {
  input.value.focus()
}

//----------------------------------------------hooks--------------------------------------
onMounted(() => {
  if (input.value) {
    input.value.focus()
  }
})

//-------------------------------------------exposed methods-------------------------------
defineExpose({
	focusInput
})
</script>

<style lang="scss" scoped>
form {
  // padding-top: 20px;

  .command {
    display: flex;
    justify-content: center;
    padding-bottom: 5px;

    div {
      display: flex;
       align-items: center;
      
    }

    input, textarea {
      font-family: 'Courier';
      flex-grow: 1;
      font-size: 16px;
      border-width: 0px;
      color: $text-primary-color;
      background-color: rgba(0,0,0,0);
      padding-left: 5px;
    }
    *:focus {
      border-width: 0px;
      outline: none;
      outline-style: none;
      border-color: inherit;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }
}


</style>