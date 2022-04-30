
export default () => {  
  
  const path = ref('$')
  const user = ref('debian')
  const machine = ref('server1-uk1')
  
  let commandPointer = -1
  const command = useCommandState()

  const executeCommand = (command: string) => {
    console.debug('command', command)
  }

  return {
    path,
    user,
    machine,
    executeCommand
  }
}