<template lang="pug">
form(@submit.prevent="execute")
  .command 
    div debian@server1-uk1:~{{ path }}
    input(
      v-model="command" 
      ref="input" 
      @keydown="browseHistory"
    )
</template>

<script setup>
// data
const path = ref('$')
const commandPointer = ref(-1)
const command = useCommandState()
const input = ref()
const history = useHistoryState()

const {executeCommand} = useCommandLine()

//---------------------------------------------methods-------------------------------------
const execute = () => {
  if (command.value === '') return

  //save the command in history and clear the input 
  history.value.push(command.value)
  
  executeCommand(command.value)

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
  padding-top: 20px;

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
      background-color: $bg-primary-color;
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