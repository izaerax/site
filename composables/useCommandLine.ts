export default () => {

  const executeCommand = (command: string) => {
    console.debug('command', command)
  }

  return {
    executeCommand
  }
}