<template lang="pug">
form(@submit.prevent="execute")
  .command 
    Path(:user="user" :path="path")
    input(
      class="standard-font"
      v-model="command" 
      ref="input" 
      @keydown="checkShortcut"
    )
</template>

<script lant="ts" setup>
import { useFilesystemStore } from '~~/stores/filesystemStore';

// data
const commandPointer = ref(-1)
const command = useCommandState()
const history = useHistoryState()
const input = ref()

const user = useUserState().value
const filesystemStore = useFilesystemStore()
const path = computed(() => (filesystemStore.fullpath) ? filesystemStore.fullpath : '~')
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

/**
 * comand line shortcuts
 */ 
const checkShortcut = (e) => {
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

/**
 * Used to focus the commandLine input
 * EXPOSED
 */
const focusInput = () => {
  input.value.focus()
}

//----------------------------------------------hooks--------------------------------------
onMounted(() => {
  if (input.value) {
    input.value.focus()
  }
})

onUpdated(() => {
  //scroll to bottom after rendering command
  console.log('scroll command line')
  window.scroll({top: document.body.scrollHeight+20, behavior: 'smooth'})
  window.scrollBy(0,550)
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
      flex-grow: 1;
      border-width: 0px;
      color: $text-primary-color;
      background-color: rgba(0,0,0,0);
      padding-left: 9px;
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